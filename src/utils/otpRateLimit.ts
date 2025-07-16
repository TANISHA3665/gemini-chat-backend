import { checkRateLimit } from "./rateLimit.js";

// Allows only 1 OTP per windowSec. Returns seconds to wait if limit exceeded.
export async function checkOtpRateLimit(mobile: string, ttl: number = 300): Promise<number> {
    const key = `otp_rl:${mobile}`;
    const { allowed, ttl: wait } = await checkRateLimit(key, 1, ttl);
    return allowed ? 0 : wait;
};