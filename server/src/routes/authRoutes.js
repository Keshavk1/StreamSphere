import express from 'express';
import * as authController from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/auth.js';
import { registerValidator, loginValidator } from '../validators/authValidator.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

router.post('/register', registerValidator, validate, authController.register);
router.post('/login', loginValidator, validate, authController.login);
router.get('/me', authMiddleware, authController.getMe);
router.put('/update-channel', authMiddleware, authController.updateChannel);

export default router;
