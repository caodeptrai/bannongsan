"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = exports.OrderController = void 0;
const express_validator_1 = require("express-validator");
const order_service_1 = require("../services/order.service");
class OrderController {
    async create(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ', errors: errors.array() });
            }
            const { items, ...shippingInfo } = req.body;
            const order = await order_service_1.orderService.create(req.user.id, { items, ...shippingInfo });
            res.status(201).json({ success: true, message: 'Đặt hàng thành công', data: order });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async getMyOrders(req, res) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const result = await order_service_1.orderService.getUserOrders(req.user.id, page, limit);
            res.json({ success: true, ...result });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    async getMyOrderById(req, res) {
        try {
            const order = await order_service_1.orderService.getOrderById(req.params.id, req.user.id);
            res.json({ success: true, data: order });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async cancelOrder(req, res) {
        try {
            const { reason } = req.body;
            const order = await order_service_1.orderService.cancelOrder(req.params.id, req.user.id, reason);
            res.json({ success: true, message: 'Hủy đơn hàng thành công', data: order });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    // Admin
    async getAllOrders(req, res) {
        try {
            const { page, limit, status, search, startDate, endDate } = req.query;
            const result = await order_service_1.orderService.getAllOrders({
                page: page ? Number(page) : undefined,
                limit: limit ? Number(limit) : undefined,
                status: status,
                search: search,
                startDate: startDate,
                endDate: endDate,
            });
            res.json({ success: true, ...result });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    async getOrderDetail(req, res) {
        try {
            const order = await order_service_1.orderService.getOrderDetail(req.params.id);
            res.json({ success: true, data: order });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async updateStatus(req, res) {
        try {
            const { status, cancelReason } = req.body;
            const order = await order_service_1.orderService.updateStatus(req.params.id, status, cancelReason);
            res.json({ success: true, message: 'Cập nhật trạng thái thành công', data: order });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async getStatistics(req, res) {
        try {
            const { startDate, endDate } = req.query;
            const stats = await order_service_1.orderService.getStatistics(startDate, endDate);
            res.json({ success: true, data: stats });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
exports.OrderController = OrderController;
exports.orderController = new OrderController();
//# sourceMappingURL=order.controller.js.map