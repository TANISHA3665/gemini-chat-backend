import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { changePasswordSchema, sendOtpSchema, signupSchema, verifyOtpSchema } from '../validators/auth.validator.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', validate(signupSchema), AuthController.signup);
router.post('/send-otp', validate(sendOtpSchema), AuthController.sendOtp);
router.post('/verify-otp', validate(verifyOtpSchema), AuthController.verifyOtp);
router.post('/forgot-password', validate(sendOtpSchema), AuthController.sendOtp);
router.post('/change-password', authenticate, validate(changePasswordSchema), AuthController.changePassword);

export default router;