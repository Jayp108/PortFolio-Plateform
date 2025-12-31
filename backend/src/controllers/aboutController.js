import About from '../models/About.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About information not found',
      });
    }

    res.status(200).json({
      success: true,
      data: { about },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createOrUpdateAbout = async (req, res) => {
  try {
    const { name, role, bio, skills, resumeLink, email, phone, location, linkedin, github } = req.body;

    let about = await About.findOne();

    if (about) {
      about.name = name || about.name;
      about.role = role || about.role;
      about.bio = bio || about.bio;
      about.skills = skills || about.skills;
      about.resumeLink = resumeLink !== undefined ? resumeLink : about.resumeLink;
      about.email = email || about.email;
      about.phone = phone || about.phone;
      about.location = location || about.location;
      about.linkedin = linkedin || about.linkedin;
      about.github = github || about.github;

      await about.save();

      res.status(200).json({
        success: true,
        message: 'About information updated successfully',
        data: { about },
      });
    } else {
      about = await About.create({
        name,
        role,
        bio,
        skills,
        resumeLink,
        email,
        phone,
        location,
        linkedin,
        github,
      });

      res.status(201).json({
        success: true,
        message: 'About information created successfully',
        data: { about },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addSkill = async (req, res) => {
  try {
    const { skill } = req.body;

    if (!skill || !skill.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a skill',
      });
    }

    let about = await About.findOne();

    if (!about) {
      about = await About.create({ skills: [skill.trim()] });
    } else {
      if (about.skills.includes(skill.trim())) {
        return res.status(400).json({
          success: false,
          message: 'Skill already exists',
        });
      }
      about.skills.push(skill.trim());
      await about.save();
    }

    res.status(200).json({
      success: true,
      message: 'Skill added successfully',
      data: { about },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { skill } = req.body;

    if (!skill) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a skill to delete',
      });
    }

    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About information not found',
      });
    }

    about.skills = about.skills.filter(s => s !== skill);
    await about.save();

    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully',
      data: { about },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a resume file',
      });
    }

    const uploadsDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const resumePath = `/uploads/${req.file.filename}`;
    
    let about = await About.findOne();

    if (about) {
      if (about.resumeLink) {
        const oldResumePath = path.join(__dirname, '../..', about.resumeLink);
        if (fs.existsSync(oldResumePath)) {
          fs.unlinkSync(oldResumePath);
        }
      }

      about.resumeLink = resumePath;
      about.resumeFileName = req.file.originalname;
      await about.save();

      res.status(200).json({
        success: true,
        message: 'Resume uploaded successfully',
        data: { 
          resumeLink: resumePath,
          resumeFileName: req.file.originalname,
        },
      });
    } else {
      about = await About.create({
        resumeLink: resumePath,
        resumeFileName: req.file.originalname,
      });

      res.status(201).json({
        success: true,
        message: 'Resume uploaded successfully',
        data: { 
          resumeLink: resumePath,
          resumeFileName: req.file.originalname,
        },
      });
    }
  } catch (error) {
    if (req.file) {
      const filePath = path.join(__dirname, '../../uploads', req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getResume = async (req, res) => {
  try {
    const about = await About.findOne();

    if (!about || !about.resumeLink) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    res.status(200).json({
      success: true,
      data: { 
        resumeLink: about.resumeLink,
        resumeFileName: about.resumeFileName || 'resume.pdf',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const downloadResume = async (req, res) => {
  try {
    const about = await About.findOne();

    if (!about || !about.resumeLink) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    const resumePath = path.join(__dirname, '../..', about.resumeLink);

    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({
        success: false,
        message: 'Resume file not found',
      });
    }

    const fileName = about.resumeFileName || 'resume.pdf';
    res.download(resumePath, fileName);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
