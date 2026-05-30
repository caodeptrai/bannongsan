"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const auth_1 = require("../middlewares/auth");
const validators_1 = require("../validators");
const router = (0, express_1.Router)();
// Public routes
router.get('/', product_controller_1.productController.getAll);
router.get('/featured', product_controller_1.productController.getFeatured);
router.get('/new-arrivals', product_controller_1.productController.getNewArrivals);
router.get('/best-sellers', product_controller_1.productController.getBestSellers);
router.get('/slug/:slug', product_controller_1.productController.getBySlug);
router.get('/related/:productId/:categoryId', product_controller_1.productController.getRelated);
router.get('/:id', product_controller_1.productController.getById);
// Admin routes
router.get('/admin/all', auth_1.authMiddleware, auth_1.adminMiddleware, product_controller_1.productController.getAllAdmin);
router.post('/', auth_1.authMiddleware, auth_1.adminMiddleware, validators_1.productValidation, product_controller_1.productController.create);
router.put('/:id', auth_1.authMiddleware, auth_1.adminMiddleware, product_controller_1.productController.update);
router.delete('/:id', auth_1.authMiddleware, auth_1.adminMiddleware, product_controller_1.productController.delete);
exports.default = router;
//# sourceMappingURL=product.routes.js.map