import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createChatroomSchema } from '../validators/chatroom.validator.js';
import { ChatroomController } from '../controllers/chatroom.controller.js';

const router = Router();

router.post('/', authenticate, validate(createChatroomSchema), ChatroomController.create);

router.get('/', authenticate, ChatroomController.list);
router.get('/:id', authenticate, ChatroomController.getById);

export default router;