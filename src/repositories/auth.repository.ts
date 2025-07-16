import { redisClient } from '../libs/redis.js';
import { User } from '../models/index.js';

const OTP_PREFIX = 'otp:';

export const AuthRepository = {
    async storeOtp(mobile: string, otp: string) {
        await redisClient.set(`${OTP_PREFIX}${mobile}`, otp, 'EX', 300);
    },
    
    async getOtp(mobile: string) {
        return await redisClient.get(`${OTP_PREFIX}${mobile}`);
    },

    async deleteOtp(mobile: string) {
        await redisClient.del(`${OTP_PREFIX}${mobile}`);
    },
  
    async findUserByMobile(mobile: string) {
        return await User.findOne({ where: { mobile } });
    },

    async createUser(data: Partial<User>) {
        return await User.create(data);
    },
};