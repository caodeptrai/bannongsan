"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatbotController = exports.ChatbotController = void 0;
const express_validator_1 = require("express-validator");
const chatbot_service_1 = require("../services/chatbot.service");
class ChatbotController {
    async getResponse(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ', errors: errors.array() });
            }
            const { message } = req.body;
            const result = await chatbot_service_1.chatbotService.getResponse(message);
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async getAllFAQs(req, res) {
        try {
            const faqs = await chatbot_service_1.chatbotService.getAllFAQs();
            res.json({ success: true, data: faqs });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    async createFAQ(req, res) {
        try {
            const faq = await chatbot_service_1.chatbotService.createFAQ(req.body);
            res.status(201).json({ success: true, message: 'Tạo FAQ thành công', data: faq });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    async updateFAQ(req, res) {
        try {
            const faq = await chatbot_service_1.chatbotService.updateFAQ(req.params.id, req.body);
            res.json({ success: true, message: 'Cập nhật FAQ thành công', data: faq });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async deleteFAQ(req, res) {
        try {
            await chatbot_service_1.chatbotService.deleteFAQ(req.params.id);
            res.json({ success: true, message: 'Xóa FAQ thành công' });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async getAllFAQsAdmin(req, res) {
        try {
            const { page, limit, category, search } = req.query;
            const result = await chatbot_service_1.chatbotService.getAllFAQsAdmin({
                page: page ? Number(page) : undefined,
                limit: limit ? Number(limit) : undefined,
                category: category,
                search: search,
            });
            res.json({ success: true, ...result });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
exports.ChatbotController = ChatbotController;
exports.chatbotController = new ChatbotController();
//# sourceMappingURL=chatbot.controller.js.map