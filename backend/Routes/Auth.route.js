import express from 'express';
import { register, login } from "../controllers/authcontrollers.js";
import { getUserProfile, getCompanyProfile } from "../controllers/profileController.js";
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Combined registration and login
router.post('/register', register);
router.post('/login', login);

// Profile retrieval
router.get('/user/:id/profile', authenticateToken, getUserProfile);
router.get('/company/:id/profile', authenticateToken, getCompanyProfile);

export default router;

