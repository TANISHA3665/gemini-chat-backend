import { Response, NextFunction } from 'express';
import { StripeService } from '../services/index.js';
import { AuthenticatedRequest } from '../types/index.js';

export const createCheckoutSession = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.id;
        const url = await StripeService.createCheckoutSession({ userId});
        res.status(200).json({ url });
    } catch (err) {
        next(err);
    }
};