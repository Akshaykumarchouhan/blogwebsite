import express from 'express';
import {
    getCategories,
    createCategory,
    getTags,
    createTag,
} from '../controllers/category';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Categories
router.route('/categories')
    .get(getCategories)
    .post(protect, authorize('admin'), createCategory);

// Tags
router.route('/tags')
    .get(getTags)
    .post(protect, createTag);

export default router;
