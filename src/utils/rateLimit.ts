import { redisClient } from '../config/redis.config.js';

const OTP_RATE_LIMIT_PREFIX = 'otp_rl:';

// Allows only 1 OTP per windowSec. Returns seconds to wait if limit exceeded, or 0 if allowed.
export async function checkOtpRateLimit(mobile: string, windowSec: number = 300): Promise<number> {
    const key = `${OTP_RATE_LIMIT_PREFIX}${mobile}`;
    const count = await redisClient.incr(key);
    if (count === 1) {
        await redisClient.expire(key, windowSec);
        return 0;
    }
    
    // If already set, get TTL
    const ttl = await redisClient.ttl(key);
    return ttl > 0 ? ttl : windowSec;
}
