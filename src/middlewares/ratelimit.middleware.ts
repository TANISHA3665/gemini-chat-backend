import { Response, NextFunction } from 'express';
import { checkGeminiRateLimit } from '../utils/index.js';
import { AuthenticatedRequest } from '../types/index.js';

export const geminiRateLimit = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = req.user!.id;
    const tier = req.user!.tier;

    const { allowed, resetTime } = await checkGeminiRateLimit(userId, tier);

    if (!allowed) {
        return res.status(429).json({
            error: `Rate limit exceeded. You can try again after ${resetTime}. Upgrade to PRO for higher limits.`,
        });
    }
    next();
};
