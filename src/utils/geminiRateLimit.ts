import { checkRateLimit } from './rateLimit.js';

const GEMINI_LIMITS = {
    BASIC: 5,
    PRO: 1000,
};

export function checkGeminiRateLimit(userId: string, tier: 'BASIC' | 'PRO') {
    const key = `rate:${userId}`;
    const limit = GEMINI_LIMITS[tier];
    const ttl = 86400; // 24 hours
    return checkRateLimit(key, limit, ttl);
};
