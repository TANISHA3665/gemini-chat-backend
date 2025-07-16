import { redisClient } from "../redis.js";

export async function connectToRedis() {
    return new Promise<void>((resolve, reject) => {
        redisClient.on('connect', () => {
            console.log('Redis connected');
            resolve();
        });
        
        redisClient.on('error', (err) => {
            console.error( 'Redis error:', err);
            reject(err);
        });
    });
};
