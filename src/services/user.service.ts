import { UserRepository } from "../repositories/user.repository.js";

export const UserService = {
    async getUserById(id: string) {
        const user = await UserRepository.findById(id);
        if (!user) throw new Error('User not found');
        return user;
    }
};
