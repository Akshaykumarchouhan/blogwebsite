import express from 'express';
import {
    getUserProfile,
    updateProfile,
    followUser,
    unfollowUser,
    deleteAccount,
} from '../controllers/user';
import { protect } from '../middleware/auth';

const router = express.Router();

router.get('/:username', getUserProfile);
router.put('/profile', protect, updateProfile);
router.post('/:id/follow', protect, followUser);
router.delete('/:id/follow', protect, unfollowUser);
router.delete('/account', protect, deleteAccount);

export default router;
