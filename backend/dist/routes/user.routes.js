"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get('/admin/all', auth_1.authMiddleware, auth_1.adminMiddleware, user_controller_1.userController.getAll);
router.get('/admin/:id', auth_1.authMiddleware, auth_1.adminMiddleware, user_controller_1.userController.getById);
router.put('/admin/:id/status', auth_1.authMiddleware, auth_1.adminMiddleware, user_controller_1.userController.updateStatus);
router.get('/admin/stats/dashboard', auth_1.authMiddleware, auth_1.adminMiddleware, user_controller_1.userController.getDashboardStats);
exports.default = router;
//# sourceMappingURL=user.routes.js.map