import { Response, NextFunction } from 'express';
import { StripeService } from '../services/index.js';
import { AuthenticatedRequest } from '../types/index.js';

export const createCheckoutSession = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const url = await StripeService.createCheckoutSession(req.user!.id);
        res.status(200).json({ url });
    } catch (err) {
        next(err);
    }
};