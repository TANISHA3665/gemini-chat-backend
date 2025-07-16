import Stripe from 'stripe';
import { ENV } from '../config/env.config.js';

const stripe = new Stripe(ENV.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil',
});

export const StripeService = {
    async createCheckoutSession(userId: string) {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer_email: `${userId}@demo.com`, // optional
            line_items: [
                {
                    price: ENV.STRIPE_PRICE_ID!,
                    quantity: 1,
                },
            ],
            metadata: {
                userId,
            },
        });

        return session.url;
    },
};