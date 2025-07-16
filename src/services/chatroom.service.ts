import { ChatroomRepository } from '../repositories/index.js';
import { Cache } from '../utils/index.js';
import { CreateChatroomInput, GetChatroomInput, ListChatroomsInput } from '../types/index.js';

export const ChatroomService = {
    async create(payload: CreateChatroomInput) {
        const { userId, topic } = payload;
        const chatroom = await ChatroomRepository.create({ userId, topic });

        await Cache.del(`chatrooms:${userId}`);
        return chatroom;
    },

    async list(payload: ListChatroomsInput) {
        const { userId } = payload;
        const cacheKey = `chatrooms:${userId}`;
        const cached = await Cache.get(cacheKey);

        if (cached) {
            return JSON.parse(cached);
        }

        const chatrooms = await ChatroomRepository.findAllByUser(userId);
        await Cache.set(cacheKey, JSON.stringify(chatrooms), 300);

        return chatrooms;
    },

    async getById(payload: GetChatroomInput) {
        const { id, userId } = payload;
        return await ChatroomRepository.findByIdAndUser(id, userId);
    }
};
