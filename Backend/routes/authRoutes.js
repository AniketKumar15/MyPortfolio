import express from 'express';
import { authUser, registerUser, getUserProfile, updateAdminCredentials } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.put('/credentials', protect, updateAdminCredentials);

export default router;
