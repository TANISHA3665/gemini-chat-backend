// 📦 BullMQ setup (Redis-based Job Queue)
import { Queue, Worker, Job, QueueEvents } from 'bullmq';
import { ENV } from '../config/env.config.js';
import { Redis } from 'ioredis';
import { redisClient } from './redis.js';

const GeminiQueue = new Queue('gemini', { connection: redisClient });
const GeminiQueueEvents = new QueueEvents('gemini');

export { GeminiQueue, GeminiQueueEvents, Worker, Job };
