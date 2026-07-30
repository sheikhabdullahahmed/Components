import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to register user
router.route('/').post(registerUser);

// Public route to log in user
router.post('/login', authUser);

// Protected route to get logged-in user profile
router.route('/profile').get(protect, getUserProfile);

export default router;
