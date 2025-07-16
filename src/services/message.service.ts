import {
    CreateMessageInput,
    ListMessagesInput
} from '../types/message.types.js';
import { MessageRepository } from '../repositories/message.repository.js';

export const MessageService = {
    async create(payload: CreateMessageInput) {
        const { chatroomId, userId, content, role } = payload;
        return await MessageRepository.create({ chatroomId, userId, content, role });
    },

    async list(payload: ListMessagesInput) {
        const { chatroomId, userId } = payload;
        return await MessageRepository.findByChatroom(chatroomId);
    }
};
