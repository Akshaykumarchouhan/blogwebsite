import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Post from '../models/Post';
import Comment from '../models/Comment';
import { AuthRequest } from '../middleware/auth';

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const totalUsers = await User.countDocuments();
        const totalPosts = await Post.countDocuments();
        const totalComments = await Comment.countDocuments();

        // Get active users (e.g. registered in last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const newUsersLast30Days = await User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalPosts,
                totalComments,
                newUsersLast30Days,
            },
        });
    } catch (err) {
        next(err);
    }
};
