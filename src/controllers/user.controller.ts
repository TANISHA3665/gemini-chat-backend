// src/modules/user/user.controller.ts
import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { UserService } from '../services/index.js';


export async function getProfile(req: AuthenticatedRequest, res: Response) {
    const id = req.user!.id;

    const user = await UserService.getUserById({ id });
    
    res.status(200).json({ data: user });
};
