import { Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/index.js';
import { AuthenticatedRequest, JwtPayload } from '../types/index.js';


export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'] as string | undefined;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = verifyJwt(token) as JwtPayload;
        req.user = decoded;
        next();
    } catch (err) {
        return next(new Error('Invalid or expired token'));
    }
};