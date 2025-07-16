import { ChatroomRepository } from '../repositories/chatroom.repository.js';
import { Cache } from '../utils/cache.js';

export const ChatroomService = {
    async create(userId: string, topic: string) {
        const chatroom = await ChatroomRepository.create({ userId, topic });
        
        await Cache.del(`chatrooms:${userId}`);
        
        return chatroom;
    },

    async list(userId: string) {
        const cacheKey = `chatrooms:${userId}`;
        const cached = await Cache.get(cacheKey);

        if (cached) {
            return JSON.parse(cached);
        }

        const chatrooms = await ChatroomRepository.findAllByUser(userId);
        await Cache.set(cacheKey, JSON.stringify(chatrooms), 300);

        return chatrooms;
    },

    async getById(id: string, userId: string) {
        return await ChatroomRepository.findByIdAndUser(id, userId);
    },
};

