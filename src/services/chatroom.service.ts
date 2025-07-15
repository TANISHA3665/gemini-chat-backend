import { ChatroomRepository } from '../repositories/chatroom.repository.js';

export const ChatroomService = {
    async create(userId: string, topic: string) {
        return await ChatroomRepository.create({ userId, topic });
    },

    async list(userId: string) {
        return await ChatroomRepository.findAllByUser(userId);
    },

    async getById(id: string, userId: string) {
        return await ChatroomRepository.findByIdAndUser(id, userId);
    },
};
