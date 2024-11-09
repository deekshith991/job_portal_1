import express from 'express';
import { register, login } from "../controllers/authcontrollers.js";
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Combined registration and login
router.post('/register', register);
router.post('/login', login);

export default router;

