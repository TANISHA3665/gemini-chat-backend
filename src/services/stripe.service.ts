import { ENV } from '../config/env.config.js';
import { stripe } from '../libs/stripe.js';
import { createCheckoutSessionInput } from '../types/index.js';

export const StripeService = {
    async createCheckoutSession(data: createCheckoutSessionInput) {
        const { userId } = data;

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
            success_url: `${ENV.DOMAIN}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${ENV.DOMAIN}/payment/cancel`,
        });

        return session.url;
    },
};