import { z } from 'zod';

export const sendOtpSchema = z.object({
    mobile: z.string().regex(/^[0-9]{10}$/, 'Mobile must be 10-digit'),
});

export const verifyOtpSchema = z.object({
    mobile: z.string().regex(/^[0-9]{10}$/),
    otp: z.string().length(6),
});

export const changePasswordSchema = z.object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const signupSchema = z.object({
    mobile: z.string().regex(/^[0-9]{10}$/, 'Mobile must be 10-digit'),
    name: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
});

