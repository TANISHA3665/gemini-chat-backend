import { Response, NextFunction } from 'express';
import { MessageService } from '../services/index.js';
import { getGeminiQueue, getGeminiQueueEvents } from '../libs/bullmq.js';
import { AuthenticatedRequest } from '../types/index.js';
import { MessageRole } from '../models/message.model.js';

export async function send(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const { content } = req.body;
        const chatroomId = req.params.id;

        const userId = req.user!.id;

        // Save user message
        await MessageService.create({
            chatroomId,
            userId,
            content,
            role: MessageRole.USER,
        });

        console.log("Message created by user")

        // Push Gemini reply job to queue
        const job = await getGeminiQueue().add('generate-gemini', {
            prompt: content
        });

        // Wait for reply from worker
        const aiReply: string = await job.waitUntilFinished(getGeminiQueueEvents());

        await MessageService.create({
            chatroomId,
            userId,
            content: aiReply,
            role: MessageRole.AI,
        });

        res.status(200).json({ reply: aiReply });
    } catch (err) {
        next(err);
    }
};

export async function list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const chatroomId = req.params.id;
        const userId = req.user!.id;

        const messages = await MessageService.list({ chatroomId, userId });
        res.json({ messages });
    } catch (err) {
        next(err);
    }    
};