import { generateOtp, signJwt, checkOtpRateLimit } from '../utils/index.js';
import { AuthSendOtpInput, AuthVerifyOtpInput, changePasswordInput, JwtPayload } from '../types/index.js';
import { UserRepository, AuthRepository } from '../repositories/index.js';

export const AuthService = {

    async sendOtp(data: AuthSendOtpInput) {
        const waitSec = await checkOtpRateLimit(data.mobile, 300);
        
        if (waitSec > 0) {
            throw new Error(`OTP already sent. Please wait ${waitSec} seconds before requesting again.`);
        }

        const otp = generateOtp();
        await AuthRepository.storeOtp(data.mobile, otp);

        return { mobile: data.mobile, otp };
    },

    async verifyOtp(data: AuthVerifyOtpInput) {
        const storedOtp = await AuthRepository.getOtp(data.mobile);
        if (!storedOtp || storedOtp !== data.otp) throw new Error('Invalid or expired OTP');

        let user = await AuthRepository.findUserByMobile(data.mobile);
        if (!user) user = await AuthRepository.createUser(data);

        await AuthRepository.deleteOtp(data.mobile);

        const payload: JwtPayload = { id: user.id, mobile: user.mobile, tier: user.tier };
        const token = signJwt(payload);

        return { token };
    },

    async signup(data: AuthSendOtpInput) {
        const exists = await AuthRepository.findUserByMobile(data.mobile);

        if (exists) throw new Error('User already exists');

        const user = await AuthRepository.createUser(data);

        const token = signJwt({ id: user.id, mobile: user.mobile, tier: user.tier });

        return { token };
    },

    async changePassword(data: changePasswordInput) {
        const user = await UserRepository.findById(data.id);
        if (!user) throw new Error('User not found');

        await UserRepository.updateUser(data.id, { password: data.newPassword });
    },
};