import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.config.js';
import { JwtPayload } from '../types/auth.types.js';

export const signJwt = (payload: JwtPayload): string => {
    return jwt.sign(payload, ENV.JWT_SECRET as string, {
        expiresIn: '7d',
    });
};

export const verifyJwt = (token: string): JwtPayload => {
    return jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;
};