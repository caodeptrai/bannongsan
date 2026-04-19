import { Router } from 'express';
import { productController } from '../controllers/product.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';
import { productValidation } from '../validators';

const router = Router();

// Public routes
router.get('/', productController.getAll);
router.get('/featured', productController.getFeatured);
router.get('/new-arrivals', productController.getNewArrivals);
router.get('/best-sellers', productController.getBestSellers);
router.get('/slug/:slug', productController.getBySlug);
router.get('/related/:productId/:categoryId', productController.getRelated);
router.get('/:id', productController.getById);

// Admin routes
router.get('/admin/all', authMiddleware, adminMiddleware, productController.getAllAdmin);
router.post('/', authMiddleware, adminMiddleware, productValidation, productController.create);
router.put('/:id', authMiddleware, adminMiddleware, productController.update);
router.delete('/:id', authMiddleware, adminMiddleware, productController.delete);

export default router;
