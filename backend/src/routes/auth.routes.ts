import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth';
import { changePasswordValidation, loginValidation, registerValidation, updateProfileValidation, validateRequest } from '../validators';

const router = Router();

// Public routes
router.post('/register', registerValidation, validateRequest, authController.register);
router.post('/login', loginValidation, validateRequest, authController.login);

// Protected routes
router.get('/profile', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, updateProfileValidation, validateRequest, authController.updateProfile);
router.post('/change-password', authMiddleware, changePasswordValidation, validateRequest, authController.changePassword);

export default router;
