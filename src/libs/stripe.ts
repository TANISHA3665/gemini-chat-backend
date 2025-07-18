import Stripe from 'stripe';
import { ENV } from '../config/env.config.js';

export const stripe = new Stripe(ENV.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil',
});