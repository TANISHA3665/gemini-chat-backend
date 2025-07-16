import { Redis } from 'ioredis';
import { ENV } from '../config/env.config.js';

export const redisClient = new Redis(ENV.REDIS_URL || 'redis://localhost:6379');

redisClient.on('connect', () => {
    console.log('Redis connected');
});

redisClient.on('error', (err: any) => {
    console.error('Redis connection error:', err);
});
