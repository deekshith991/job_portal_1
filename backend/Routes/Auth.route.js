import express from 'express';
import {
  user_register,
  user_login,
  company_register,
  company_login
} from "../controllers/authcontrollers.js";
import { getUserProfile, getCompanyProfile } from "../controllers/profileController.js";
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// User routes
router.post('/user/register', user_register);
router.post('/user/login', user_login);
router.get('/user/:id/profile', authenticateToken, getUserProfile);

// Company routes
router.post('/company/register', company_register);
router.post('/company/login', company_login);
router.get('/company/:id/profile', authenticateToken, getCompanyProfile);

export default router;
