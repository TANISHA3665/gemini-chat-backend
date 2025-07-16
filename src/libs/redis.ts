import { Redis } from 'ioredis';
import { ENV } from '../config/env.config.js';

export const redisClient = new Redis(ENV.REDIS_URL || 'redis://localhost:6379');
