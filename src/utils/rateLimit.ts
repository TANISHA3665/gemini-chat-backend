import { getRedisClient } from '../libs/init/redis.js';

export async function checkRateLimit(key: string, limit: number, ttlSeconds: number): Promise<{ allowed: boolean, ttl: number; }> {
    const redis = getRedisClient();
    const count = await redis.incr(key);

    if (count === 1) {
        await redis.expire(key, ttlSeconds);
        return { allowed: true, ttl: 0 };
    }

    const ttl = await redis.ttl(key);
    return {
        allowed: count <= limit,
        ttl: ttl > 0 ? ttl : ttlSeconds
    };
};
