import { Worker } from '../libs/bullmq.js';
import { MessageRole } from '../models/message.model.js';
import { MessageService } from '../services/message.service.js';
import { generateGeminiReply } from '../utils/gemini.js';

new Worker(
    'gemini',
    async (job) => {
        const { prompt, userId, chatroomId } = job.data;
        const reply = await generateGeminiReply(prompt);

        await MessageService.create({
            userId,
            chatroomId,
            content: reply,
            role: MessageRole.AI
        });

        return reply;
    },
    {
        connection: { host: 'localhost', port: 6379 },
    }
);
