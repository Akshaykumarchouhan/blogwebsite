import express from 'express';
import {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    likePost,
} from '../controllers/post';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/')
    .get(getPosts)
    .post(protect, createPost);

router.route('/:slug')
    .get(getPost);

router.route('/:id')
    .put(protect, updatePost)
    .delete(protect, deletePost);

router.post('/:id/like', protect, likePost);
// router.post('/:id/bookmark', protect, bookmarkPost); // Will be added later

export default router;
