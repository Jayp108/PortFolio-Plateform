import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await api.get('/about');
      if (response.data.success) {
        setAboutData(response.data.data.about);
      }
    } catch (error) {
      console.error('Failed to fetch about data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Who I Am</h2>
              {aboutData?.name && (
                <p className="text-2xl text-primary font-semibold mb-2">{aboutData.name}</p>
              )}
              {aboutData?.role && (
                <p className="text-lg text-gray-600 mb-4">{aboutData.role}</p>
              )}
              <p className="text-gray-700 mb-4 leading-relaxed">
                {aboutData?.bio || `I'm a passionate full-stack developer with expertise in building modern web applications
                using the MERN stack. I love creating elegant solutions to complex problems and delivering
                high-quality, scalable applications.`}
              </p>
              {!aboutData?.bio && (
                <p className="text-gray-700 mb-4 leading-relaxed">
                  With a strong foundation in both frontend and backend technologies, I bring ideas to life
                  with clean code, intuitive user interfaces, and robust architectures.
                </p>
              )}
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Skills</h2>
              {aboutData?.skills && aboutData.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {aboutData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Frontend</h3>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Redux', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3'].map((skill) => (
                        <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Backend</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Node.js', 'Express', 'MongoDB', 'JWT', 'REST API'].map((skill) => (
                        <span key={skill} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Git', 'GitHub', 'VS Code', 'Postman', 'npm'].map((skill) => (
                        <span key={skill} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
