"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const express_validator_1 = require("express-validator");
const auth_service_1 = require("../services/auth.service");
class AuthController {
    async register(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ', errors: errors.array() });
            }
            const { email, password, fullName, phone } = req.body;
            const result = await auth_service_1.authService.register({ email, password, fullName, phone });
            res.status(201).json({
                success: true,
                message: 'Đăng ký tài khoản thành công',
                data: result,
            });
        }
        catch (error) {
            res.status(error.status || 500).json({
                success: false,
                message: error.message || 'Lỗi server',
            });
        }
    }
    async login(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ', errors: errors.array() });
            }
            const { email, password } = req.body;
            const result = await auth_service_1.authService.login(email, password);
            res.json({
                success: true,
                message: 'Đăng nhập thành công',
                data: result,
            });
        }
        catch (error) {
            res.status(error.status || 500).json({
                success: false,
                message: error.message || 'Lỗi server',
            });
        }
    }
    async getProfile(req, res) {
        try {
            const user = await auth_service_1.authService.getProfile(req.user.id);
            res.json({ success: true, data: user });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async updateProfile(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ', errors: errors.array() });
            }
            const user = await auth_service_1.authService.updateProfile(req.user.id, req.body);
            res.json({ success: true, message: 'Cập nhật hồ sơ thành công', data: user });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async changePassword(req, res) {
        try {
            const { oldPassword, newPassword } = req.body;
            const result = await auth_service_1.authService.changePassword(req.user.id, oldPassword, newPassword);
            res.json({ success: true, ...result });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map