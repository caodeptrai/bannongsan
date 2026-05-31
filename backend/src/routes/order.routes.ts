import { Router } from 'express';
import { orderController } from '../controllers/order.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';
import {
  dateRangeQueryValidation,
  orderAdminQueryValidation,
  orderStatusValidation,
  orderValidation,
  paginationQueryValidation,
  validateRequest,
} from '../validators';

const router = Router();

// Customer routes
router.post('/', authMiddleware, orderValidation, validateRequest, orderController.create);
router.get('/my', authMiddleware, paginationQueryValidation, validateRequest, orderController.getMyOrders);
router.get('/my/:id', authMiddleware, orderController.getMyOrderById);
router.put('/my/:id/cancel', authMiddleware, orderController.cancelOrder);

// Admin routes
router.get('/admin/all', authMiddleware, adminMiddleware, orderAdminQueryValidation, validateRequest, orderController.getAllOrders);
router.get('/admin/statistics/revenue', authMiddleware, adminMiddleware, dateRangeQueryValidation, validateRequest, orderController.getStatistics);
router.get('/admin/:id', authMiddleware, adminMiddleware, orderController.getOrderDetail);
router.put('/admin/:id/status', authMiddleware, adminMiddleware, orderStatusValidation, validateRequest, orderController.updateStatus);

export default router;
