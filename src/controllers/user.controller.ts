// src/modules/user/user.controller.ts
import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { UserService } from '../services/index.js';


export async function getProfile(req: AuthenticatedRequest, res: Response) {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'Unauthorized: User not found.' });
    }
    const userId = req.user.id;
    const user = await UserService.getUserById(userId);
    res.status(200).json({ user });
};
