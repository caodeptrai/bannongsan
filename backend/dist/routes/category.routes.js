"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const auth_1 = require("../middlewares/auth");
const validators_1 = require("../validators");
const router = (0, express_1.Router)();
// Public routes
router.get('/', category_controller_1.categoryController.getAll);
router.get('/:id', category_controller_1.categoryController.getById);
// Admin routes
router.get('/admin/all', auth_1.authMiddleware, auth_1.adminMiddleware, category_controller_1.categoryController.getAllAdmin);
router.post('/', auth_1.authMiddleware, auth_1.adminMiddleware, validators_1.categoryValidation, category_controller_1.categoryController.create);
router.put('/:id', auth_1.authMiddleware, auth_1.adminMiddleware, category_controller_1.categoryController.update);
router.delete('/:id', auth_1.authMiddleware, auth_1.adminMiddleware, category_controller_1.categoryController.delete);
exports.default = router;
//# sourceMappingURL=category.routes.js.map