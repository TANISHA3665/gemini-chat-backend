import { Queue, QueueEvents } from 'bullmq';
import { ENV } from '../config/env.config.js';

let GeminiQueueInstance: Queue;
let GeminiQueueEventsInstance: QueueEvents;

export const initGeminiQueue = () => {
    GeminiQueueInstance = new Queue('gemini', {
        connection: {
            // ✅ FIX: remove "url", use host/port/password directly
            host: new URL(ENV.REDIS_URL!).hostname,
            port: Number(new URL(ENV.REDIS_URL!).port),
            password: new URL(ENV.REDIS_URL!).password,
            tls: ENV.REDIS_URL!.startsWith('rediss://') ? {} : undefined,
        },
    });

    GeminiQueueEventsInstance = new QueueEvents('gemini', {
        connection: {
            host: new URL(ENV.REDIS_URL!).hostname,
            port: Number(new URL(ENV.REDIS_URL!).port),
            password: new URL(ENV.REDIS_URL!).password,
            tls: ENV.REDIS_URL!.startsWith('rediss://') ? {} : undefined,
        },
    });

    console.log('✅ Gemini Queue Initialized');
};

export const getGeminiQueue = () => {
    if (!GeminiQueueInstance) throw new Error('GeminiQueue not initialized');
    return GeminiQueueInstance;
};

export const getGeminiQueueEvents = () => {
    if (!GeminiQueueEventsInstance) throw new Error('GeminiQueueEvents not initialized');
    return GeminiQueueEventsInstance;
};
