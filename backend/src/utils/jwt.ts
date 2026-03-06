import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const generateAccessToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    });
};

export const generateRefreshToken = (id: string): string => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
    });
};

// Generate and hash password token
export const getResetPasswordToken = (): { resetToken: string; hashedToken: string } => {
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    return { resetToken, hashedToken };
};
