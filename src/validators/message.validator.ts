import { z } from 'zod';

export const sendMessageSchema = z.object({
    content: z.string().min(1, 'Message cannot be empty'),
});