import express, { Router } from 'express';
import { SubscriptionController, WebHookController } from '../controllers/index.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';

const router = Router();

router.post('/subscribe/pro', authenticate, SubscriptionController.createCheckoutSession);

export default router;