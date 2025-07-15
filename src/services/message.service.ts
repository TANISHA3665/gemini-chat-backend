import { MessageRepository } from '../repositories/message.repository.js';
import { generateGeminiReply } from '../utils/gemini.js';

export const MessageService = {
    async sendAndRespond(userId: string, chatroomId: string, content: string) {
        const userMessage = await MessageRepository.create({
            userId,
            chatroomId,
            content,
            role: 'USER',
        });

        const aiContent = await generateGeminiReply(content);

        const aiMessage = await MessageRepository.create({
            userId,
            chatroomId,
            content: aiContent,
            role: 'AI',
        });

        return [userMessage, aiMessage];
    },

    async getHistory(chatroomId: string) {
        return await MessageRepository.findByChatroom(chatroomId);
    },
};
