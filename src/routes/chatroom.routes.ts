import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createChatroomSchema } from '../validators/chatroom.validator.js';
import { ChatroomController } from '../controllers/chatroom.controller.js';
import { sendMessageSchema } from '../validators/message.validator.js';
import { MessageController } from '../controllers/message.controller.js';

const router = Router();

router.post('/', authenticate, validate(createChatroomSchema), ChatroomController.create);

// Chatroom routes
router.get('/', authenticate, ChatroomController.list);
router.get('/:id', authenticate, ChatroomController.getById);

// Message routes
router.post('/:id/message', authenticate, validate(sendMessageSchema), MessageController.send);
router.get('/history/:chatroomId', authenticate, MessageController.history);

export default router;