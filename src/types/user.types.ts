import { Tier } from "../models/user.model.js";

export interface UpdateUserTierInput{
    id: string,
    tier: Tier
};

export interface GetUserByIdInput{
    id: string
}