import { Router } from 'express';
import { cartController } from '../controllers/cart.controller';
import { authMiddleware, optionalAuth } from '../middlewares/auth';
import { cartItemValidation } from '../validators';

const router = Router();

router.get('/', optionalAuth, cartController.getCart);
router.post('/items', optionalAuth, cartItemValidation, cartController.addItem);
router.put('/items/:id', optionalAuth, cartController.updateItem);
router.delete('/items/:id', optionalAuth, cartController.removeItem);
router.delete('/clear', optionalAuth, cartController.clearCart);
router.post('/merge', authMiddleware, cartController.mergeCart);

export default router;
