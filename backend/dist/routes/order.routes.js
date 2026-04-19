"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const auth_1 = require("../middlewares/auth");
const validators_1 = require("../validators");
const router = (0, express_1.Router)();
// Customer routes
router.post('/', auth_1.authMiddleware, validators_1.orderValidation, order_controller_1.orderController.create);
router.get('/my', auth_1.authMiddleware, order_controller_1.orderController.getMyOrders);
router.get('/my/:id', auth_1.authMiddleware, order_controller_1.orderController.getMyOrderById);
router.put('/my/:id/cancel', auth_1.authMiddleware, order_controller_1.orderController.cancelOrder);
// Admin routes
router.get('/admin/all', auth_1.authMiddleware, auth_1.adminMiddleware, order_controller_1.orderController.getAllOrders);
router.get('/admin/:id', auth_1.authMiddleware, auth_1.adminMiddleware, order_controller_1.orderController.getOrderDetail);
router.put('/admin/:id/status', auth_1.authMiddleware, auth_1.adminMiddleware, validators_1.orderStatusValidation, order_controller_1.orderController.updateStatus);
router.get('/admin/statistics/revenue', auth_1.authMiddleware, auth_1.adminMiddleware, order_controller_1.orderController.getStatistics);
exports.default = router;
//# sourceMappingURL=order.routes.js.map