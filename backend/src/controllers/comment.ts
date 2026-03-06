import { Request, Response, NextFunction } from 'express';
import Comment from '../models/Comment';
import Post from '../models/Post';
import { AuthRequest } from '../middleware/auth';

// @desc    Get comments for a post
// @route   GET /api/posts/:postId/comments
// @access  Public
export const getComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const comments = await Comment.find({
            post: req.params.postId,
            parentComment: { $exists: false }, // Only top-level
            isDeleted: false,
        })
            .populate('author', 'fullName username profilePicture')
            .populate({
                path: 'replies',
                match: { isDeleted: false },
                populate: { path: 'author', select: 'fullName username profilePicture' },
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: comments.length,
            data: comments,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Add comment
// @route   POST /api/posts/:postId/comments
// @access  Private
export const addComment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            res.status(404).json({ success: false, message: 'Post not found' });
            return;
        }

        const { content, parentComment } = req.body;

        const commentData: any = {
            content,
            post: req.params.postId,
            author: req.user?.id,
        };

        if (parentComment) {
            const parent = await Comment.findById(parentComment);
            if (!parent) {
                res.status(404).json({ success: false, message: 'Parent comment not found' });
                return;
            }
            commentData.parentComment = parentComment;
        }

        const comment = await Comment.create(commentData);

        // If it's a reply, push to parent's replies array
        if (parentComment) {
            await Comment.findByIdAndUpdate(parentComment, {
                $push: { replies: comment._id },
            });
        }

        await comment.populate('author', 'fullName username profilePicture');

        res.status(201).json({
            success: true,
            data: comment,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
export const updateComment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        let comment = await Comment.findById(req.params.id);

        if (!comment) {
            res.status(404).json({ success: false, message: 'Comment not found' });
            return;
        }

        // Checking if user is comment author
        if (comment.author.toString() !== req.user?.id) {
            res.status(403).json({ success: false, message: 'User not authorized to update comment' });
            return;
        }

        // 15 minute edit window
        const diffInMinutes = (Date.now() - comment.createdAt.getTime()) / 1000 / 60;
        if (diffInMinutes > 15) {
            res.status(400).json({ success: false, message: 'Comment can only be edited within 15 minutes' });
            return;
        }

        comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { content: req.body.content, isEdited: true },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: comment,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
export const deleteComment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            res.status(404).json({ success: false, message: 'Comment not found' });
            return;
        }

        if (comment.author.toString() !== req.user?.id && req.user?.role !== 'admin') {
            res.status(403).json({ success: false, message: 'User not authorized to delete comment' });
            return;
        }

        comment.isDeleted = true;
        comment.content = '[This comment has been deleted]';
        await comment.save();

        res.status(200).json({
            success: true,
            message: 'Comment deleted',
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Like comment
// @route   POST /api/comments/:id/like
// @access  Private
export const likeComment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            res.status(404).json({ success: false, message: 'Comment not found' });
            return;
        }

        const userId = req.user?.id;
        const isLiked = comment.likes.includes(userId);

        if (isLiked) {
            comment.likes = comment.likes.filter((id) => id.toString() !== userId.toString());
        } else {
            comment.likes.push(userId);
        }

        await comment.save();

        res.status(200).json({
            success: true,
            data: comment.likes,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Report comment
// @route   POST /api/comments/:id/report
// @access  Private
export const reportComment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            res.status(404).json({ success: false, message: 'Comment not found' });
            return;
        }

        comment.isFlagged = true;
        await comment.save();

        res.status(200).json({
            success: true,
            message: 'Comment reported for admin review',
        });
    } catch (err) {
        next(err);
    }
};
