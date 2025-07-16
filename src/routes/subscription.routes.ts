import { Router } from 'express';
import { SubscriptionController } from '../controllers/index.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';

const router = Router();

router.post('/checkout', authenticate, SubscriptionController.createCheckoutSession);

export default router;