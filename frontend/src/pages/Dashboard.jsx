import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/authSlice';
import api from '../services/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const user = useSelector(selectUser);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    liveLink: '',
    image: '',
  });
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    if (user?.role !== 'admin') {
      toast.error('Access denied. Admin privileges required.');
      return;
    }
    fetchProfile();
    fetchProjects();
    fetchAboutData();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/auth/profile');
      if (response.data.success) {
        setProfile(response.data.data.user);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch profile';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const response = await api.get('/projects');
      if (response.data.success) {
        setProjects(response.data.data.projects);
      }
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoadingProjects(false);
    }
  };

  const fetchAboutData = async () => {
    try {
      const response = await api.get('/about');
      if (response.data.success) {
        setAboutData(response.data.data.about);
        setSkills(response.data.data.about?.skills || []);
      }
    } catch (error) {
      console.error('Failed to fetch about data');
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) {
      toast.error('Please enter a skill');
      return;
    }

    try {
      const response = await api.post('/about/skills', { skill: newSkill.trim() });
      if (response.data.success) {
        toast.success('Skill added successfully!');
        setSkills(response.data.data.about.skills);
        setNewSkill('');
        setShowSkillModal(false);
        fetchAboutData();
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add skill';
      toast.error(message);
    }
  };

  const handleDeleteSkill = async (skill) => {
    if (!window.confirm(`Delete skill "${skill}"?`)) {
      return;
    }

    try {
      const response = await api.delete('/about/skills', { data: { skill } });
      if (response.data.success) {
        toast.success('Skill deleted successfully!');
        setSkills(response.data.data.about.skills);
        fetchAboutData();
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete skill';
      toast.error(message);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setResumeFile(file);
    }
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) {
      toast.error('Please select a resume file');
      return;
    }

    setUploadingResume(true);
    const formData = new FormData();
    formData.append('resume', resumeFile);

    try {
      const response = await api.put('/about/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Resume uploaded successfully!');
        setResumeFile(null);
        document.getElementById('resumeInput').value = '';
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to upload resume';
      toast.error(message);
    } finally {
      setUploadingResume(false);
    }
  };

  const handleProjectFormChange = (e) => {
    setProjectForm({
      ...projectForm,
      [e.target.name]: e.target.value,
    });
  };

  const openProjectModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({
        title: project.title,
        description: project.description,
        technologies: project.technologies.join(', '),
        githubLink: project.githubLink || '',
        liveLink: project.liveLink || '',
        image: project.image || '',
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: '',
        description: '',
        technologies: '',
        githubLink: '',
        liveLink: '',
        image: '',
      });
    }
    setShowProjectModal(true);
  };

  const closeProjectModal = () => {
    setShowProjectModal(false);
    setEditingProject(null);
    setProjectForm({
      title: '',
      description: '',
      technologies: '',
      githubLink: '',
      liveLink: '',
      image: '',
    });
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      title: projectForm.title,
      description: projectForm.description,
      technologies: projectForm.technologies.split(',').map(t => t.trim()).filter(t => t),
      githubLink: projectForm.githubLink,
      liveLink: projectForm.liveLink,
      image: projectForm.image,
    };

    try {
      if (editingProject) {
        const response = await api.put(`/projects/${editingProject._id}`, projectData);
        if (response.data.success) {
          toast.success('Project updated successfully!');
          fetchProjects();
          closeProjectModal();
        }
      } else {
        const response = await api.post('/projects', projectData);
        if (response.data.success) {
          toast.success('Project created successfully!');
          fetchProjects();
          closeProjectModal();
        }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Operation failed';
      toast.error(message);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const response = await api.delete(`/projects/${projectId}`);
      if (response.data.success) {
        toast.success('Project deleted successfully!');
        fetchProjects();
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete project';
      toast.error(message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Projects</p>
                <p className="text-3xl font-bold text-primary">{projects.length}</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Skills</p>
                <p className="text-3xl font-bold text-green-600">{skills.length}</p>
              </div>
              <div className="text-4xl"></div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Resume</p>
                <p className="text-3xl font-bold text-blue-600">{aboutData?.resumeLink ? '✓' : '✗'}</p>
              </div>
              <div className="text-4xl">📄</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Resume Management</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Resume (PDF only, max 5MB)
              </label>
              <input
                type="file"
                id="resumeInput"
                accept=".pdf"
                onChange={handleResumeChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary"
              />
            </div>
            {resumeFile && (
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <span className="text-sm text-gray-700">{resumeFile.name}</span>
                <button
                  onClick={handleResumeUpload}
                  disabled={uploadingResume}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition disabled:opacity-50"
                >
                  {uploadingResume ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Skills Management</h2>
            <button
              onClick={() => setShowSkillModal(true)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition"
            >
              + Add Skill
            </button>
          </div>

          {skills.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No skills yet. Add your first skill!</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleDeleteSkill(skill)}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Projects Management</h2>
            <button
              onClick={() => openProjectModal()}
              className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-secondary transition"
            >
              + Add Project
            </button>
          </div>

          {loadingProjects ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No projects yet. Create your first project!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Technologies
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr key={project._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{project.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openProjectModal(project)}
                          className="text-primary hover:text-secondary mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Admin Profile</h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              Admin
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex border-b pb-4">
              <span className="font-semibold w-32">Name:</span>
              <span className="text-gray-700">{profile?.name}</span>
            </div>
            <div className="flex border-b pb-4">
              <span className="font-semibold w-32">Email:</span>
              <span className="text-gray-700">{profile?.email}</span>
            </div>
            <div className="flex border-b pb-4">
              <span className="font-semibold w-32">Role:</span>
              <span className="text-gray-700 capitalize">{profile?.role}</span>
            </div>
            <div className="flex pb-4">
              <span className="font-semibold w-32">Member Since:</span>
              <span className="text-gray-700">
                {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showSkillModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Add New Skill</h3>
              <button
                onClick={() => {
                  setShowSkillModal(false);
                  setNewSkill('');
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  placeholder="e.g., React.js"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  onClick={() => {
                    setShowSkillModal(false);
                    setNewSkill('');
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSkill}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                >
                  Add Skill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">
                  {editingProject ? 'Edit Project' : 'Create New Project'}
                </h3>
                <button
                  onClick={closeProjectModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={projectForm.title}
                    onChange={handleProjectFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter project title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={projectForm.description}
                    onChange={handleProjectFormChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter project description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    name="technologies"
                    value={projectForm.technologies}
                    onChange={handleProjectFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub Link
                  </label>
                  <input
                    type="url"
                    name="githubLink"
                    value={projectForm.githubLink}
                    onChange={handleProjectFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Live Link
                  </label>
                  <input
                    type="url"
                    name="liveLink"
                    value={projectForm.liveLink}
                    onChange={handleProjectFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image (emoji or URL)
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={projectForm.image}
                    onChange={handleProjectFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="🚀 or image URL"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={closeProjectModal}
                    className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition"
                  >
                    {editingProject ? 'Update Project' : 'Create Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
