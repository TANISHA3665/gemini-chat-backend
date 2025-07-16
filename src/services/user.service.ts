import { UserRepository } from "../repositories/index.js";

export const UserService = {
    async getUserById(id: string) {
        const user = await UserRepository.findById(id);
        if (!user) throw new Error('User not found');
        return user;
    }
};
