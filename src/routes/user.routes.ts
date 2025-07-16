import { Router } from 'express';
import { authenticate } from '../middlewares/index.js';
import { UserController } from '../controllers/index.js';

const router = Router();

router.get('/me', authenticate, UserController.getProfile);

export default router;
