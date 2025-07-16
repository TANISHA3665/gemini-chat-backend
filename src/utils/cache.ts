import { redisClient } from "../libs/redis.js";

export const Cache = {
    async get(key: string) {
        const val = await redisClient.get(key);
        return val ? JSON.parse(val) : null;
    },
    async set(key: string, value: any, ttl: number = 300) {
        await redisClient.set(key, JSON.stringify(value), 'EX', ttl);
    },
    async del(key: string) {
        await redisClient.del(key);
    },
};
