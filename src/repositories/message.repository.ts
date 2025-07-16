import { Message } from '../models/index.js';

export const MessageRepository = {
    async create(data: { userId: string, chatroomId: string, content: string, role: string; }) {
        return await Message.create(data);
    },

    async findByChatroom(chatroomId: string) {
        return await Message.findAll({
            where: { chatroomId },
            order: [['createdAt', 'ASC']],
        });
    },
};