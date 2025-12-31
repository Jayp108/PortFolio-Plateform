import mongoose from 'mongoose';
import dotenv from 'dotenv';
import About from '../models/About.js';
import connectDB from '../config/db.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/../../.env` });

const seedAboutData = async () => {
  try {
    await connectDB();

    const existingAbout = await About.findOne();

    if (existingAbout) {
      console.log('About data already exists. Updating contact information...');
      
      existingAbout.email = existingAbout.email || 'rjayprakash303@gmail.com';
      existingAbout.phone = existingAbout.phone || '9389203228';
      existingAbout.location = existingAbout.location || 'Jaipur, India';
      existingAbout.linkedin = existingAbout.linkedin || 'https://www.linkedin.com/in/your-profile';
      existingAbout.github = existingAbout.github || 'https://github.com/your-username';
      
      await existingAbout.save();
      console.log('✓ About data updated successfully!');
    } else {
      const aboutData = {
        name: 'Your Name',
        role: 'Full-Stack MERN Developer',
        bio: 'Passionate full-stack developer specializing in the MERN stack. I build scalable web applications with modern technologies and clean code practices.',
        skills: [
          'JavaScript',
          'React.js',
          'Node.js',
          'Express.js',
          'MongoDB',
          'Redux Toolkit',
          'Tailwind CSS',
          'REST APIs',
          'Git & GitHub',
          'JWT Authentication'
        ],
        email: 'rjayprakash303@gmail.com',
        phone: '9389203228',
        location: 'Jaipur, India',
        linkedin: 'https://www.linkedin.com/in/your-profile',
        github: 'https://github.com/your-username'
      };

      await About.create(aboutData);
      console.log('✓ About data seeded successfully!');
    }

    console.log('\nContact Information:');
    console.log('Email: rjayprakash303@gmail.com');
    console.log('Phone: 9389203228');
    console.log('Location: Jaipur, India');
    console.log('\n✓ Database seeding completed!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAboutData();
