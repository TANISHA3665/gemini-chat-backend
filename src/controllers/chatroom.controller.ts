import { Response, NextFunction } from 'express';
import { ChatroomService } from '../services/index.js';
import { AuthenticatedRequest } from '../types/index.js';

export async function create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const { topic } = req.body;

        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const userId = req.user.id;
        const chatroom = await ChatroomService.create({ userId, topic});
        res.status(201).json({ chatroom });
    } catch (err) {
        next(err);
    }
};

export async function list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const userId = req.user.id;
        const chatrooms = await ChatroomService.list({ userId });

        res.json({ chatrooms });
    } catch (err) {
    next(err);
    }
};

export async function getById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        const userId = req.user.id;

        const chatroom = await ChatroomService.getById({ id , userId });
        if (!chatroom) return res.status(404).json({ error: 'Chatroom not found' });

        res.json({ chatroom });
    } catch (err) {
        next(err);
    }
};