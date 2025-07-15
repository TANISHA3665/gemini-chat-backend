import { Response, NextFunction } from 'express';
import { MessageService } from '../services/message.service.js';
import { AuthenticatedRequest } from '../middlewares/authenticate.middleware.js';

export const MessageController = {
    async send(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const { content } = req.body;
            const { id: chatroomId } = req.params;
            const [userMsg, aiMsg] = await MessageService.sendAndRespond(req.user.id, chatroomId, content);
            res.status(201).json({ userMsg, aiMsg });
        } catch (err) {
            next(err);
        }
    },

    async history(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const messages = await MessageService.getHistory(req.params.chatroomId);
            res.json({ messages });
        } catch (err) {
            next(err);
        }
    },
};