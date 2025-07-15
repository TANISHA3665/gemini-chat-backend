import { createClient } from 'redis';
import { ENV } from './env.config.js';

export const redisClient = createClient({
    url: ENV.REDIS_URL,
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

redisClient.on('connect', () => {
    console.log('Redis connected');
});

await redisClient.connect();