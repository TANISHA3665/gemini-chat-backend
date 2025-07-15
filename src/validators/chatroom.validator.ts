import { z } from 'zod';

export const createChatroomSchema = z.object({
    topic: z.string().min(1, 'Topic is required'),
});