import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
    content: string;
    author: mongoose.Types.ObjectId;
    post: mongoose.Types.ObjectId;
    parentComment?: mongoose.Types.ObjectId; // For nested replies
    replies: mongoose.Types.ObjectId[];
    likes: mongoose.Types.ObjectId[];
    isEdited: boolean;
    isDeleted: boolean; // Soft delete
    isFlagged: boolean; // Flagged for admin review
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
    {
        content: { type: String, required: true, maxlength: 1500 },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
        parentComment: { type: Schema.Types.ObjectId, ref: 'Comment' }, // null if top-level
        replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
        likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        isEdited: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
        isFlagged: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Populate replies and author automatically (optional, depends on depth needs)
// But typically better to populate explicitly in the controller to control depth.

export default mongoose.model<IComment>('Comment', CommentSchema);
