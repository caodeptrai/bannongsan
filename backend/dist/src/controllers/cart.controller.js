"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = exports.CartController = void 0;
const express_validator_1 = require("express-validator");
const cart_service_1 = require("../services/cart.service");
class CartController {
    async getCart(req, res) {
        try {
            const sessionId = req.headers['x-session-id'];
            const result = await cart_service_1.cartService.getCart(req.user?.id || null, sessionId || null);
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    async addItem(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ', errors: errors.array() });
            }
            const sessionId = req.headers['x-session-id'];
            const { productId, quantity } = req.body;
            const result = await cart_service_1.cartService.addItem(req.user?.id || null, sessionId || null, productId, quantity);
            res.json({ success: true, message: 'Thêm vào giỏ hàng thành công', data: result });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async updateItem(req, res) {
        try {
            const sessionId = req.headers['x-session-id'];
            const { quantity } = req.body;
            await cart_service_1.cartService.updateItem(req.params.id, quantity, req.user?.id || null, sessionId || null);
            res.json({ success: true, message: 'Cập nhật giỏ hàng thành công' });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async removeItem(req, res) {
        try {
            const sessionId = req.headers['x-session-id'];
            await cart_service_1.cartService.removeItem(req.params.id, req.user?.id || null, sessionId || null);
            res.json({ success: true, message: 'Xóa sản phẩm khỏi giỏ hàng thành công' });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async clearCart(req, res) {
        try {
            const sessionId = req.headers['x-session-id'];
            await cart_service_1.cartService.clearCart(req.user?.id || null, sessionId || null);
            res.json({ success: true, message: 'Xóa giỏ hàng thành công' });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async mergeCart(req, res) {
        try {
            const sessionId = req.headers['x-session-id'];
            if (!sessionId) {
                return res.status(400).json({ success: false, message: 'Thiếu session ID' });
            }
            const result = await cart_service_1.cartService.mergeCart(req.user.id, sessionId);
            res.json({ success: true, message: 'Ghép giỏ hàng thành công', data: result });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
exports.CartController = CartController;
exports.cartController = new CartController();
//# sourceMappingURL=cart.controller.js.map