import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    id: string;
    fullName: string;
    username: string;
    email: string;
    password?: string;
    profilePicture?: string;
    bio?: string;
    location?: string;
    website?: string;
    socialLinks?: {
        twitter?: string;
        github?: string;
        linkedin?: string;
    };
    role: 'user' | 'admin';
    emailPreferences: {
        notifications: boolean;
    };
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    comparePassword: (enteredPassword: string) => Promise<boolean>;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        fullName: { type: String, required: true },
        username: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true, select: false },
        profilePicture: { type: String },
        bio: { type: String, maxlength: 300 },
        location: { type: String },
        website: { type: String },
        socialLinks: {
            twitter: { type: String },
            github: { type: String },
            linkedin: { type: String },
        },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        emailPreferences: {
            notifications: { type: Boolean, default: true },
        },
        followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    { timestamps: true }
);

// Encrypt password using bcrypt
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(12);
    if (this.password) {
        this.password = await bcrypt.hash(this.password, salt);
    }
});

// Match user entered password to hashed password in database
UserSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password || '');
};

export default mongoose.model<IUser>('User', UserSchema);
