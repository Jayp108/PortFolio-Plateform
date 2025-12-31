import { upload } from "../middlewares/upload.js";
import express from 'express';
import {
  uploadResume,
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  
} from '../controllers/projectController.js';
import { protect, adminOnly } from '../middlewares/auth.js';

const router = express.Router();
// import upload from "../middlewares/upload.js";

router.post("/upload-resume", upload.single("resume"), uploadResume);


router.post('/', protect, adminOnly, createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', protect, adminOnly, updateProject);
router.delete('/:id', protect, adminOnly, deleteProject);

export default router;
