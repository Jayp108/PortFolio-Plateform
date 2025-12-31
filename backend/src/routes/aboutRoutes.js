import express from 'express';
import { 
  getAbout, 
  createOrUpdateAbout, 
  uploadResume, 
  getResume,
  downloadResume,
  addSkill,
  deleteSkill
} from '../controllers/aboutController.js';
import { protect, adminOnly } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

router.get('/', getAbout);
router.put('/', protect, adminOnly, createOrUpdateAbout);
router.post('/skills', protect, adminOnly, addSkill);
router.delete('/skills', protect, adminOnly, deleteSkill);
router.put('/resume', protect, adminOnly, upload.single('resume'), uploadResume);
router.get('/resume', getResume);
router.get('/resume/download', downloadResume);

export default router;
