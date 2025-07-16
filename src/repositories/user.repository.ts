import { User } from '../models/index.js';

export const UserRepository = {
    async findById(id: string) {
        return await User.findByPk(id);
    },
    
    async findAll() {
        return await User.findAll({ order: [['createdAt', 'DESC']] });
    },
  
    async updateUser(id: string, data: Partial<User>) {
        const user = await User.findByPk(id);
        if (!user) throw new Error('User not found');
        return await user.update(data);
    },
};