import { Chatroom } from '../models/chatroom.model.js';

export const ChatroomRepository = {
    async create(data: { userId: string; topic: string; }) {
        return await Chatroom.create(data);
    },

    async findAllByUser(userId: string) {
        return await Chatroom.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
        });
    },

    async findByIdAndUser(id: string, userId: string) {
        return await Chatroom.findOne({ where: { id, userId } });
    },
};