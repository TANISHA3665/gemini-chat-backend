import { UserRepository } from "../repositories/index.js";
import { GetUserByIdInput, UpdateUserTierInput } from "../types/index.js";

export const UserService = {
    async getUserById(data: GetUserByIdInput) {
        const user = await UserRepository.findById(data.id);
        if (!user) throw new Error('User not found');
        return user;
    },

    async updateUserTier(data: UpdateUserTierInput) {
        await UserRepository.updateUser(data.id, { tier: data.tier });
    },
};
