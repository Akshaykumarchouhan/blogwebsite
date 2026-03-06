import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    slug: string;
    description?: string;
    color?: string;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        description: { type: String, maxlength: 500 },
        color: { type: String, default: '#8b5cf6' }, // default violet-500
    },
    { timestamps: true }
);

export default mongoose.model<ICategory>('Category', CategorySchema);
