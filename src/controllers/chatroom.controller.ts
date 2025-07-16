import { Response, NextFunction } from 'express';
import { ChatroomService } from '../services/chatroom.service.js';
import { AuthenticatedRequest } from '../types/auth.types.js';

export const ChatroomController = {
    async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const chatroom = await ChatroomService.create(req.user.id, req.body.topic);
            res.status(201).json({ chatroom });
        } catch (err) {
            next(err);
        }
    },

    async list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const chatrooms = await ChatroomService.list(req.user.id);
            res.json({ chatrooms });
        } catch (err) {
            next(err);
        }
    },

    async getById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const chatroom = await ChatroomService.getById(req.params.id, req.user.id);
            if (!chatroom) return res.status(404).json({ error: 'Chatroom not found' });
            res.json({ chatroom });
        } catch (err) {
            next(err);
        }
    },
};