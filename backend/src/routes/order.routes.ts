import { Router } from 'express';
import { orderController } from '../controllers/order.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';
import { orderValidation, orderStatusValidation } from '../validators';

const router = Router();

// Customer routes
router.post('/', authMiddleware, orderValidation, orderController.create);
router.get('/my', authMiddleware, orderController.getMyOrders);
router.get('/my/:id', authMiddleware, orderController.getMyOrderById);
router.put('/my/:id/cancel', authMiddleware, orderController.cancelOrder);

// Admin routes
router.get('/admin/all', authMiddleware, adminMiddleware, orderController.getAllOrders);
router.get('/admin/:id', authMiddleware, adminMiddleware, orderController.getOrderDetail);
router.put('/admin/:id/status', authMiddleware, adminMiddleware, orderStatusValidation, orderController.updateStatus);
router.get('/admin/statistics/revenue', authMiddleware, adminMiddleware, orderController.getStatistics);

export default router;
