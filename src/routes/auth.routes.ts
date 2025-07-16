import { Router } from 'express';
import { authenticate, validate } from '../middlewares/index.js';
import { changePasswordSchema, sendOtpSchema, signupSchema, verifyOtpSchema } from '../validators/index.js';
import { AuthController } from '../controllers/index.js';

const router = Router();

router.post('/signup', validate(signupSchema), AuthController.signup);
router.post('/send-otp', validate(sendOtpSchema), AuthController.sendOtp);
router.post('/verify-otp', validate(verifyOtpSchema), AuthController.verifyOtp);
router.post('/forgot-password', validate(sendOtpSchema), AuthController.sendOtp);
router.post('/change-password', authenticate, validate(changePasswordSchema), AuthController.changePassword);

export default router;