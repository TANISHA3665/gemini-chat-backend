import { Redis } from 'ioredis';
import { ENV } from '../../config/env.config.js';

let redisClient: Redis;

export const connectToRedis = () => {
    redisClient = new Redis(ENV.REDIS_URL!, {
        tls: ENV.REDIS_URL?.startsWith('rediss://') ? {} : undefined
    });
    console.log('✅ Redis connected');
};

export const getRedisClient = () => {
    if (!redisClient) throw new Error('Redis client not initialized');
    return redisClient;
};