import { Router } from 'express';

import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import chatroomRoutes from './chatroom.routes.js';
import subscriptionRoutes from './subscription.routes.js';
import webhookRoutes from './webhook.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/chatroom', chatroomRoutes);
router.use('/', subscriptionRoutes);
router.use('/webhook', webhookRoutes);

export default router;