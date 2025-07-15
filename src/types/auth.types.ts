import { Tier } from "../models/user.model.js";

export interface AuthSendOtpInput { mobile: string; }

export interface AuthVerifyOtpInput { mobile: string; otp: string; }

export interface JwtPayload { id: string; mobile: string; tier: Tier; }