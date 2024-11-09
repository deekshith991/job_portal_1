import express from 'express';
import { updateUserProfile, getUserProfile } from '../controllers/UserProfileController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:accountId', authenticateToken, getUserProfile);
router.put('/:accountId', authenticateToken, updateUserProfile);

export default router;
