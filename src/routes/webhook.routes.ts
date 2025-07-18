import express, { Router } from 'express';
import { WebHookController } from '../controllers/index.js';

const router = Router();

router.post('/stripe', express.raw({ type: 'application/json' }), WebHookController.handleStripeWebhook);

export default router;