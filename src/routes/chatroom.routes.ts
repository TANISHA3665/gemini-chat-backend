import { Router } from 'express';
import { authenticate, validate, geminiRateLimit } from '../middlewares/index.js';
import { createChatroomSchema, sendMessageSchema } from '../validators/index.js';
import { ChatroomController, MessageController } from '../controllers/index.js';

const router = Router();

// Chatroom routes
router.post('/', authenticate, validate(createChatroomSchema), ChatroomController.create);

router.get('/', authenticate, ChatroomController.list);
router.get('/:id', authenticate, ChatroomController.getById);


// Message routes
router.post('/:id/message', authenticate, geminiRateLimit, validate(sendMessageSchema), MessageController.send);

router.get('/history/:chatroomId', authenticate, MessageController.list);

export default router;