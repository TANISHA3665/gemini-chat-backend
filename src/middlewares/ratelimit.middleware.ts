import { Response, NextFunction } from 'express';
import { checkGeminiRateLimit } from '../utils/index.js';
import { AuthenticatedRequest } from '../types/index.js';

export const geminiRateLimit = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const tier = req.user?.tier || 'BASIC';

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized: User ID is missing.'});
    }

    const { allowed, ttl } = await checkGeminiRateLimit(userId, tier);

    if (!allowed) {
        return res.status(429).json({
            error: `Rate limit exceeded. You can try again in ${ttl} seconds. Upgrade to PRO for higher limits.`,
        });
    }

    next();
};