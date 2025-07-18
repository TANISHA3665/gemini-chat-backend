import { Tier } from '../models/user.model.js';
import { checkRateLimit } from './rateLimit.js';

const GEMINI_LIMITS = {
    BASIC: 5,
    PRO: 1000,
};

export async function checkGeminiRateLimit(userId: string, tier: Tier) {
    const key = `rate:${userId}`;
    const limit = GEMINI_LIMITS[tier];
    const ttl = 86400;

    const rateLimit = await checkRateLimit(key, limit, ttl);

    if (rateLimit.ttl === 0) {
        return { allowed: true };
    }

    const resetTime = new Date(Date.now() + rateLimit.ttl * 1000);
    const formatted = resetTime.toLocaleString('en-IN', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
    });

    return {
        allowed: false,
        resetTime: formatted,
    };
};
