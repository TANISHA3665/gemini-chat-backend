import { Router } from 'express';

import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import chatroomRoutes from './chatroom.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/chatroom', chatroomRoutes);

export default router;