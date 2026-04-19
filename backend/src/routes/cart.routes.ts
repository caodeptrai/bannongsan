import { Router } from 'express';
import { cartController } from '../controllers/cart.controller';
import { authMiddleware, optionalAuth } from '../middlewares/auth';
import { cartItemValidation } from '../validators';

const router = Router();

router.get('/', optionalAuth, cartController.getCart);
router.post('/items', optionalAuth, cartItemValidation, cartController.addItem);
router.put('/items/:id', authMiddleware, cartController.updateItem);
router.delete('/items/:id', authMiddleware, cartController.removeItem);
router.delete('/clear', authMiddleware, cartController.clearCart);
router.post('/merge', authMiddleware, cartController.mergeCart);

export default router;
