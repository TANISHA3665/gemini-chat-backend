import { redisClient } from '../config/redis.config.js';

export async function checkRateLimit(key: string, limit: number, ttlSeconds: number): Promise<{ allowed: boolean, ttl: number; }> {
    const count = await redisClient.incr(key);

    if (count === 1) {
        await redisClient.expire(key, ttlSeconds);
        return { allowed: true, ttl: 0 };
    }

    const ttl = await redisClient.ttl(key);
    return {
        allowed: count <= limit,
        ttl: ttl > 0 ? ttl : ttlSeconds
    };
};
