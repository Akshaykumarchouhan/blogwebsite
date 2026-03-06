import mongoose, { Schema, Document } from 'mongoose';

export interface ITag extends Document {
    name: string;
    slug: string;
    usageCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const TagSchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        usageCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model<ITag>('Tag', TagSchema);
