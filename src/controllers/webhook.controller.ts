import { Request, Response } from 'express';
import Stripe from 'stripe';
import { ENV } from '../config/env.config.js';
import { stripe } from '../libs/stripe.js';
import { UserService } from '../services/index.js';
import { Tier} from '../models/index.js';

export const handleStripeWebhook = async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig!, ENV.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return res.status(400).send(`Webhook Error: ${(err as any).message}`);
    }

    // Only handle payment success
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;

        if (userId) {
            await UserService.updateUserTier({id: userId, tier: Tier.PRO});
            console.log(`Upgraded user ${userId} to PRO`);
        }
    }

    res.sendStatus(200);
};