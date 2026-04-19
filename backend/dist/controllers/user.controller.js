"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    async getAll(req, res) {
        try {
            const { page, limit, search, role, status } = req.query;
            const result = await user_service_1.userService.getAll({
                page: page ? Number(page) : undefined,
                limit: limit ? Number(limit) : undefined,
                search: search,
                role: role,
                status: status,
            });
            res.json({ success: true, ...result });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    async getById(req, res) {
        try {
            const user = await user_service_1.userService.getById(req.params.id);
            res.json({ success: true, data: user });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async updateStatus(req, res) {
        try {
            const { status } = req.body;
            const user = await user_service_1.userService.updateStatus(req.params.id, status);
            res.json({ success: true, message: 'Cập nhật trạng thái thành công', data: user });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async getDashboardStats(req, res) {
        try {
            const stats = await user_service_1.userService.getDashboardStats();
            res.json({ success: true, data: stats });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
exports.UserController = UserController;
exports.userController = new UserController();
//# sourceMappingURL=user.controller.js.map