import { Request, Response, NextFunction } from 'express';
import Post from '../models/Post';
import { AuthRequest } from '../middleware/auth';

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const postData = {
            ...req.body,
            author: req.user?.id,
            readingTime: Math.ceil(req.body.wordCount / 200) || 0,
        };

        if (req.body.slug) {
            const existing = await Post.findOne({ slug: req.body.slug });
            if (existing) {
                res.status(400).json({ success: false, message: 'Slug already in use' });
                return;
            }
        }

        const post = await Post.create(postData);

        res.status(201).json({
            success: true,
            data: post,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;
        const startIndex = (page - 1) * limit;

        const query: any = { isDeleted: false };

        // Status filter - default to published for public
        if (req.query.status) {
            query.status = req.query.status;
        } else {
            query.status = 'published';
        }

        // Category filter
        if (req.query.category) {
            query.category = req.query.category;
        }

        // Tag filter
        if (req.query.tag) {
            query.tags = { $in: [req.query.tag] };
        }

        // Search filter
        if (req.query.search) {
            query.$text = { $search: req.query.search as string };
        }

        const total = await Post.countDocuments(query);
        const posts = await Post.find(query)
            .populate('author', 'fullName username profilePicture')
            .populate('category', 'name slug')
            .populate('tags', 'name slug')
            .skip(startIndex)
            .limit(limit)
            .sort(req.query.sort ? { [req.query.sort as string]: -1 } : { createdAt: -1 });

        res.status(200).json({
            success: true,
            count: posts.length,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
            data: posts,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single post by slug
// @route   GET /api/posts/:slug
// @access  Public
export const getPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const post = await Post.findOne({ slug: req.params.slug, isDeleted: false })
            .populate('author', 'fullName username profilePicture bio socialLinks')
            .populate('category', 'name slug color')
            .populate('tags', 'name slug');

        if (!post) {
            res.status(404).json({ success: false, message: 'Post not found' });
            return;
        }

        // Increment views (should ideally be debounced or tracked separately in a real app)
        post.views += 1;
        await post.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            data: post,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        let post = await Post.findById(req.params.id);

        if (!post) {
            res.status(404).json({ success: false, message: 'Post not found' });
            return;
        }

        // Make sure user is post owner or admin
        if (post.author.toString() !== req.user?.id && req.user?.role !== 'admin') {
            res.status(403).json({ success: false, message: 'User not authorized to update this post' });
            return;
        }

        // Handle version history
        if (req.body.content && req.body.content !== post.content) {
            req.body.versionHistory = post.versionHistory || [];
            req.body.versionHistory.push({
                content: post.content,
                updatedAt: Date.now()
            });
            // Keep only last 5
            if (req.body.versionHistory.length > 5) {
                req.body.versionHistory.shift();
            }
        }

        if (req.body.wordCount) {
            req.body.readingTime = Math.ceil(req.body.wordCount / 200) || 0;
        }

        post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: post,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete post (Soft delete)
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            res.status(404).json({ success: false, message: 'Post not found' });
            return;
        }

        if (post.author.toString() !== req.user?.id && req.user?.role !== 'admin') {
            res.status(403).json({ success: false, message: 'User not authorized to delete this post' });
            return;
        }

        post.isDeleted = true;
        post.deletedAt = new Date();
        await post.save();

        res.status(200).json({
            success: true,
            message: 'Post moved to trash',
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Like post
// @route   POST /api/posts/:id/like
// @access  Private
export const likePost = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            res.status(404).json({ success: false, message: 'Post not found' });
            return;
        }

        const userId = req.user?.id;
        const isLiked = post.likes.includes(userId);

        if (isLiked) {
            post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
        } else {
            post.likes.push(userId);
        }

        await post.save();

        res.status(200).json({
            success: true,
            data: post.likes,
        });
    } catch (err) {
        next(err);
    }
};
