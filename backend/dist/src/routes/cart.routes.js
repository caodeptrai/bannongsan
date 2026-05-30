"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart.controller");
const auth_1 = require("../middlewares/auth");
const validators_1 = require("../validators");
const router = (0, express_1.Router)();
router.get('/', auth_1.optionalAuth, cart_controller_1.cartController.getCart);
router.post('/items', auth_1.optionalAuth, validators_1.cartItemValidation, cart_controller_1.cartController.addItem);
router.put('/items/:id', auth_1.optionalAuth, cart_controller_1.cartController.updateItem);
router.delete('/items/:id', auth_1.optionalAuth, cart_controller_1.cartController.removeItem);
router.delete('/clear', auth_1.optionalAuth, cart_controller_1.cartController.clearCart);
router.post('/merge', auth_1.authMiddleware, cart_controller_1.cartController.mergeCart);
exports.default = router;
//# sourceMappingURL=cart.routes.js.map