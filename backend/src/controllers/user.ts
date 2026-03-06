import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Post from '../models/Post';
import { AuthRequest } from '../middleware/auth';

// @desc    Get user profile by username
// @route   GET /api/users/:username
// @access  Public
export const getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findOne({ username: req.params.username })
            .select('-password -emailPreferences -resetPasswordToken -resetPasswordExpire -email -role -createdAt -updatedAt');

        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        const postStats = await Post.aggregate([
            { $match: { author: user._id, isDeleted: false, status: 'published' } },
            {
                $group: {
                    _id: null,
                    totalPosts: { $sum: 1 },
                    totalViews: { $sum: '$views' },
                }
            }
        ]);

        const stats = postStats.length > 0 ? postStats[0] : { totalPosts: 0, totalViews: 0 };

        res.status(200).json({
            success: true,
            data: {
                user,
                stats: {
                    ...stats,
                    followersCount: user.followers.length,
                    followingCount: user.following.length,
                }
            },
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const prohibitedFields = ['password', 'role', 'email', '_id', 'followers', 'following'];
        const updateData = { ...req.body };

        prohibitedFields.forEach(field => delete updateData[field]);

        const user = await User.findByIdAndUpdate(req.user?.id, updateData, {
            new: true,
            runValidators: true,
        }).select('-password -resetPasswordToken -resetPasswordExpire');

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Follow User
// @route   POST /api/users/:id/follow
// @access  Private
export const followUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (req.params.id === req.user?.id.toString()) {
            res.status(400).json({ success: false, message: 'You cannot follow yourself' });
            return;
        }

        const targetUser = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user?.id);

        if (!targetUser || !currentUser) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        if (!targetUser.followers.includes(currentUser._id)) {
            targetUser.followers.push(currentUser._id);
            currentUser.following.push(targetUser._id);

            await targetUser.save({ validateBeforeSave: false });
            await currentUser.save({ validateBeforeSave: false });
        }

        res.status(200).json({ success: true, message: 'User followed' });
    } catch (err) {
        next(err);
    }
};

// @desc    Unfollow User
// @route   DELETE /api/users/:id/follow
// @access  Private
export const unfollowUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const targetUser = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user?.id);

        if (!targetUser || !currentUser) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        targetUser.followers = targetUser.followers.filter(id => id.toString() !== currentUser._id.toString());
        currentUser.following = currentUser.following.filter(id => id.toString() !== targetUser._id.toString());

        await targetUser.save({ validateBeforeSave: false });
        await currentUser.save({ validateBeforeSave: false });

        res.status(200).json({ success: true, message: 'User unfollowed' });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete Account
// @route   DELETE /api/users/account
// @access  Private
export const deleteAccount = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Soft or hard delete, here we'll do hard delete of user but might want soft in production
        await User.findByIdAndDelete(req.user?.id);

        // Anotate posts as deleted or keep them? The prompt implies deletion or maybe retaining as anonymous. 
        // We'll leave posts but without valid author, or we can soft delete them.
        await Post.updateMany({ author: req.user?.id }, { isDeleted: true });

        res.cookie('refreshToken', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        });

        res.status(200).json({ success: true, message: 'Account deleted' });
    } catch (err) {
        next(err);
    }
};
