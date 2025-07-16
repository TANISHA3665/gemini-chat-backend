import { Queue, Worker, Job, QueueEvents } from 'bullmq';
import { redisClient } from './redis.js';

const GeminiQueue = new Queue('gemini', { connection: redisClient });
const GeminiQueueEvents = new QueueEvents('gemini');

export { GeminiQueue, GeminiQueueEvents, Worker, Job };
