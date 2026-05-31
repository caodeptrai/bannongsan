import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';
import { userAdminQueryValidation, userStatusValidation, validateRequest } from '../validators';

const router = Router();

router.get('/admin/all', authMiddleware, adminMiddleware, userAdminQueryValidation, validateRequest, userController.getAll);
router.get('/admin/stats/dashboard', authMiddleware, adminMiddleware, userController.getDashboardStats);
router.get('/admin/:id', authMiddleware, adminMiddleware, userController.getById);
router.put('/admin/:id/status', authMiddleware, adminMiddleware, userStatusValidation, validateRequest, userController.updateStatus);

export default router;
