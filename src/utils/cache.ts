import { getRedisClient } from "../libs/init/redis.js";

export const Cache = {
    async get(key: string) {
        const redis = getRedisClient();
        const val = await redis.get(key);
        return val ? JSON.parse(val) : null;
    },
    async set(key: string, value: any, ttl: number = 300) {
        const redis = getRedisClient();
        await redis.set(key, JSON.stringify(value), 'EX', ttl);
    },
    async del(key: string) {
        const redis = getRedisClient();
        await redis.del(key);
    },
};
