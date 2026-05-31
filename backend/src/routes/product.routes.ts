import { Router } from 'express';
import { productController } from '../controllers/product.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';
import { uploadMiddleware } from '../middlewares/upload';
import {
  adminProductQueryValidation,
  limitQueryValidation,
  productQueryValidation,
  productUpdateValidation,
  productValidation,
  validateRequest,
} from '../validators';

const router = Router();

// Public routes
router.get('/', productQueryValidation, validateRequest, productController.getAll);
router.get('/featured', limitQueryValidation, validateRequest, productController.getFeatured);
router.get('/new-arrivals', limitQueryValidation, validateRequest, productController.getNewArrivals);
router.get('/best-sellers', limitQueryValidation, validateRequest, productController.getBestSellers);
router.get('/slug/:slug', productController.getBySlug);
router.get('/related/:productId/:categoryId', limitQueryValidation, validateRequest, productController.getRelated);

// Admin routes
router.get('/admin/all', authMiddleware, adminMiddleware, adminProductQueryValidation, validateRequest, productController.getAllAdmin);
router.post('/', authMiddleware, adminMiddleware, uploadMiddleware, productValidation, validateRequest, productController.create.bind(productController));
router.put('/:id', authMiddleware, adminMiddleware, uploadMiddleware, productUpdateValidation, validateRequest, productController.update.bind(productController));
router.delete('/:id', authMiddleware, adminMiddleware, productController.delete);

router.get('/:id', productController.getById);

export default router;
