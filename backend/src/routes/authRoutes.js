import express from 'express';
import {
  signup,
  login,
  getProfile,
  refreshToken,
  logout,
  checkAdminExists,
} from '../controllers/authController.js';
import { protect, adminOnly } from '../middlewares/auth.js';

const router = express.Router();

router.get('/check-admin', checkAdminExists);
router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.get('/profile', protect, adminOnly, getProfile);
router.post('/logout', protect, adminOnly, logout);

export default router;
