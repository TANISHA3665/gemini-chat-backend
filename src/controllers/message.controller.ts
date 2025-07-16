import { Response, NextFunction } from 'express';
import { MessageService } from '../services/message.service.js';
import { GeminiQueue, GeminiQueueEvents } from '../libs/bullmq.js';
import { AuthenticatedRequest } from '../types/auth.types.js';
import { MessageRole } from '../models/message.model.js';

export const MessageController = {
    async send(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const { content } = req.body;
            const chatroomId = req.params.id;
            
            if (!req.user || !req.user.id) {
                return res.status(401).json({ error: 'Unauthorized: user not found' });
            }

            const userId = req.user.id;

            // Save user message
            await MessageService.create({
                chatroomId,
                userId,
                content,
                role: MessageRole.USER,
            });

            // Push Gemini reply job to queue
            const job = await GeminiQueue.add('generate-gemini', {
                prompt: content,
                chatroomId,
                userId,
            });

            // Wait for AI reply from worker
            const aiReply: string = await job.waitUntilFinished(GeminiQueueEvents);

            res.status(200).json({ reply: aiReply });
        } catch (err) {
            next(err);
        }
    },

    async list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const chatroomId = req.params.id;
            
            if (!req.user || !req.user.id) {
                return res.status(401).json({ error: 'Unauthorized: user not found' });
            }
            
            const userId = req.user.id;

            const messages = await MessageService.list({ chatroomId, userId });
            res.json({ messages });
        } catch (err) {
            next(err);
        }
    }
};