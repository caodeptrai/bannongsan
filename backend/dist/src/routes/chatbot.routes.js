"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatbot_controller_1 = require("../controllers/chatbot.controller");
const auth_1 = require("../middlewares/auth");
const validators_1 = require("../validators");
const router = (0, express_1.Router)();
router.post('/message', validators_1.chatbotValidation, chatbot_controller_1.chatbotController.getResponse);
router.get('/faqs', chatbot_controller_1.chatbotController.getAllFAQs);
// Admin routes
router.get('/admin/faqs', auth_1.authMiddleware, auth_1.adminMiddleware, chatbot_controller_1.chatbotController.getAllFAQsAdmin);
router.post('/admin/faqs', auth_1.authMiddleware, auth_1.adminMiddleware, chatbot_controller_1.chatbotController.createFAQ);
router.put('/admin/faqs/:id', auth_1.authMiddleware, auth_1.adminMiddleware, chatbot_controller_1.chatbotController.updateFAQ);
router.delete('/admin/faqs/:id', auth_1.authMiddleware, auth_1.adminMiddleware, chatbot_controller_1.chatbotController.deleteFAQ);
exports.default = router;
//# sourceMappingURL=chatbot.routes.js.map