import { MessageRole } from "../models/message.model.js";

export interface CreateMessageInput {
    userId: string;
    chatroomId: string;
    content: string;
    role: MessageRole;
}

export interface ListMessagesInput {
    chatroomId: string;
    userId: string;
}