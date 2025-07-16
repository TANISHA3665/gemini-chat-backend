import { Request } from "express";
import { Tier } from "../models/index.js";

export interface AuthSendOtpInput { mobile: string; }

export interface AuthVerifyOtpInput { mobile: string; otp: string; }

export interface changePasswordInput { id: string; newPassword: string; }

export interface JwtPayload { id: string; mobile: string; tier: Tier; }

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload | null;
};