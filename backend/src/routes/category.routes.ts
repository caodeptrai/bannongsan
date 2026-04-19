import { Router } from 'express';
import { categoryController } from '../controllers/category.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';
import { categoryValidation } from '../validators';

const router = Router();

// Public routes
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);

// Admin routes
router.get('/admin/all', authMiddleware, adminMiddleware, categoryController.getAllAdmin);
router.post('/', authMiddleware, adminMiddleware, categoryValidation, categoryController.create);
router.put('/:id', authMiddleware, adminMiddleware, categoryController.update);
router.delete('/:id', authMiddleware, adminMiddleware, categoryController.delete);

export default router;
