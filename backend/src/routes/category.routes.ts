import { Router } from 'express';
import { categoryController } from '../controllers/category.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';
import { categoryAdminQueryValidation, categoryValidation, validateRequest } from '../validators';

const router = Router();

// Public routes
router.get('/', categoryController.getAll);

// Admin routes
router.get('/admin/all', authMiddleware, adminMiddleware, categoryAdminQueryValidation, validateRequest, categoryController.getAllAdmin);
router.post('/', authMiddleware, adminMiddleware, categoryValidation, validateRequest, categoryController.create);
router.put('/:id', authMiddleware, adminMiddleware, categoryValidation, validateRequest, categoryController.update);
router.delete('/:id', authMiddleware, adminMiddleware, categoryController.delete);

router.get('/:id', categoryController.getById);

export default router;
