import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/admin/all', authMiddleware, adminMiddleware, userController.getAll);
router.get('/admin/:id', authMiddleware, adminMiddleware, userController.getById);
router.put('/admin/:id/status', authMiddleware, adminMiddleware, userController.updateStatus);
router.get('/admin/stats/dashboard', authMiddleware, adminMiddleware, userController.getDashboardStats);

export default router;
