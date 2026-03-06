import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
    title: string;
    slug: string;
    excerpt?: string;
    content: string; // HTML or structured JSON from editor
    coverImage?: string;
    tags: mongoose.Types.ObjectId[];
    category: mongoose.Types.ObjectId;
    author: mongoose.Types.ObjectId;
    seo: {
        metaTitle?: string;
        metaDescription?: string;
        canonicalUrl?: string;
    };
    status: 'draft' | 'published' | 'scheduled';
    visibility: 'public' | 'members' | 'private';
    publishedAt?: Date;
    scheduledFor?: Date;
    readingTime: number; // in minutes
    wordCount: number;
    likes: mongoose.Types.ObjectId[];
    bookmarks: mongoose.Types.ObjectId[];
    views: number;
    isDeleted: boolean;
    deletedAt?: Date;
    versionHistory: Array<{
        content: string;
        updatedAt: Date;
    }>;
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema: Schema = new Schema(
    {
        title: { type: String, required: true, maxlength: 200, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        excerpt: { type: String, maxlength: 300 },
        content: { type: String, required: true },
        coverImage: { type: String },
        tags: [{ type: Schema.Types.ObjectId, ref: 'Tag', validate: [tagLimit, 'Exceeds the limit of 10 tags'] }],
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        seo: {
            metaTitle: { type: String, maxlength: 60 },
            metaDescription: { type: String, maxlength: 160 },
            canonicalUrl: { type: String },
        },
        status: { type: String, enum: ['draft', 'published', 'scheduled'], default: 'draft' },
        visibility: { type: String, enum: ['public', 'members', 'private'], default: 'public' },
        publishedAt: { type: Date },
        scheduledFor: { type: Date },
        readingTime: { type: Number, default: 0 },
        wordCount: { type: Number, default: 0 },
        likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        bookmarks: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        views: { type: Number, default: 0 },
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date },
        versionHistory: [
            {
                content: String,
                updatedAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

function tagLimit(val: any[]) {
    return val.length <= 10;
}

// Add text index for search
PostSchema.index({ title: 'text', content: 'text', tags: 'text' });

export default mongoose.model<IPost>('Post', PostSchema);
