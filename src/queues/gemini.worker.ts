import { Worker } from 'bullmq';
import { MessageRole } from '../models/index.js';
import { MessageService, generateGeminiReply } from '../services/index.js';
import { ENV } from '../config/env.config.js';

const redisUrl = ENV.REDIS_URL!;
const redisUrlObj = new URL(redisUrl);

const worker = new Worker(
    'gemini',
    async (job) => {
        const { prompt } = job.data;
        const reply = await generateGeminiReply(prompt);
        return reply;
    },
    {
        connection: {
            host: redisUrlObj.hostname,
            port: Number(redisUrlObj.port),
            password: redisUrlObj.password,
            tls: redisUrl.startsWith('rediss://') ? {} : undefined,
        },
    }
);

console.log('👷 Gemini Worker is running...');