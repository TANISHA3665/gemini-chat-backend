import { Request } from "express";
import { Tier } from "../models/user.model.js";

export interface AuthSendOtpInput { mobile: string; }

export interface AuthVerifyOtpInput { mobile: string; otp: string; }

export interface JwtPayload { id: string; mobile: string; tier: Tier; }

export interface changePassword { id: string; newPassword: string; }
export interface AuthenticatedRequest extends Request {
    user?: JwtPayload | null;
};