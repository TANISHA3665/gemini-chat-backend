import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/index.js';
import { AuthenticatedRequest } from '../types/index.js';

export async function sendOtp(req: Request, res: Response, next: NextFunction) {
    try {
        const { mobile } = req.body;
        const result = await AuthService.sendOtp({ mobile });
        res.status(200).json({ message: 'OTP sent', data: result });
    } catch (err) {
        next(err);
    }
};

export async function verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
        const { mobile, otp } = req.body;
        const result = await AuthService.verifyOtp({ mobile, otp });
        res.status(200).json({ message: 'OTP verified', token: result.token });
    } catch (err) {
        next(err);
    }
};

export async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const token = await AuthService.signup(req.body);
        res.status(201).json({ token });
    } catch (err) {
        next(err);
    }
};

export async function changePassword(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const { newPassword } = req.body;

        if (req.user) {
            const id = req.user.id;
            await AuthService.changePassword({ id, newPassword });
        }

        res.json({ message: 'Password updated' });
    } catch (err) {
        next(err);
    }
};