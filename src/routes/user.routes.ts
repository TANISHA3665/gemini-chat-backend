import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { UserController } from '../controllers/user.controller.js';

const router = Router();

router.get('/me', authenticate, UserController.getProfile);

export default router;
