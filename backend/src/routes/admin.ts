import express from 'express';
import { getDashboardStats } from '../controllers/admin';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/dashboard', protect, authorize('admin'), getDashboardStats);

export default router;
