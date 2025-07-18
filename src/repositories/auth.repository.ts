import { getRedisClient } from '../libs/init/redis.js';
import { User } from '../models/index.js';

const OTP_PREFIX = 'otp:';

export const AuthRepository = {
    async storeOtp(mobile: string, otp: string) {
        const redis = getRedisClient();
        await redis.set(`${OTP_PREFIX}${mobile}`, otp, 'EX', 300);
    },
    
    async getOtp(mobile: string) {
        const redis = getRedisClient();
        return await redis.get(`${OTP_PREFIX}${mobile}`);
    },

    async deleteOtp(mobile: string) {
        const redis = getRedisClient();
        await redis.del(`${OTP_PREFIX}${mobile}`);
    },
  
    async findUserByMobile(mobile: string) {
        return await User.findOne({ where: { mobile } });
    },

    async createUser(data: Partial<User>) {
        return await User.create(data);
    },
};