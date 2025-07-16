export interface CreateChatroomInput {
    userId: string;
    topic: string;
}

export interface GetChatroomInput {
    id: string;
    userId: string;
}

export interface ListChatroomsInput{
    userId: string;
}
