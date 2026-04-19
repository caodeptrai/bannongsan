import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth';
import { registerValidation, loginValidation, updateProfileValidation } from '../validators';

const router = Router();

// Public routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);

// Protected routes
router.get('/profile', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, updateProfileValidation, authController.updateProfile);
router.post('/change-password', authMiddleware, authController.changePassword);

export default router;
