import express from 'express';
import {
    getComments,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
    reportComment,
} from '../controllers/comment';
import { protect } from '../middleware/auth';

const router = express.Router({ mergeParams: true }); // Important: mergeParams allows accessing params from other routers (e.g., postId)

router.route('/')
    .get(getComments)
    .post(protect, addComment);

router.route('/:id')
    .put(protect, updateComment)
    .delete(protect, deleteComment);

router.post('/:id/like', protect, likeComment);
router.post('/:id/report', protect, reportComment);

export default router;
