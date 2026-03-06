import { Request, Response, NextFunction } from 'express';
import Category from '../models/Category';
import Tag from '../models/Tag';
import { AuthRequest } from '../middleware/auth';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const categories = await Category.find();
        res.status(200).json({ success: true, count: categories.length, data: categories });
    } catch (err) {
        next(err);
    }
};

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({ success: true, data: category });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all tags
// @route   GET /api/tags
// @access  Public
export const getTags = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const tags = await Tag.find().sort('-usageCount');
        res.status(200).json({ success: true, count: tags.length, data: tags });
    } catch (err) {
        next(err);
    }
};

// @desc    Create tag
// @route   POST /api/tags
// @access  Private
export const createTag = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const tag = await Tag.create(req.body);
        res.status(201).json({ success: true, data: tag });
    } catch (err) {
        next(err);
    }
};
