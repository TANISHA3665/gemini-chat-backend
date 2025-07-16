import { MessageRole } from "../models/index.js";

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