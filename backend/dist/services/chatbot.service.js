"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatbotService = exports.ChatbotService = void 0;
const client_1 = require("@prisma/client");
const helpers_1 = require("../utils/helpers");
const prisma = new client_1.PrismaClient();
class ChatbotService {
    async getAllFAQs() {
        return prisma.chatbotFAQ.findMany({
            where: { isActive: true },
            orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
        });
    }
    async getResponse(userMessage) {
        const normalizedMessage = userMessage.toLowerCase().trim();
        // Search FAQs by keywords or exact question match
        const faqs = await prisma.chatbotFAQ.findMany({
            where: { isActive: true },
            orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
        });
        // Try exact match first
        let bestMatch = faqs.find((faq) => faq.question.toLowerCase() === normalizedMessage);
        // Try keyword match
        if (!bestMatch) {
            const messageWords = normalizedMessage.split(/\s+/);
            let maxScore = 0;
            for (const faq of faqs) {
                const keywords = faq.keywords ? faq.keywords.toLowerCase().split(',').map((k) => k.trim()) : [];
                let score = 0;
                // Check keywords
                for (const keyword of keywords) {
                    if (normalizedMessage.includes(keyword)) {
                        score += keyword.length;
                    }
                }
                // Check question words
                for (const word of messageWords) {
                    if (faq.question.toLowerCase().includes(word) && word.length > 2) {
                        score += 1;
                    }
                }
                if (score > maxScore) {
                    maxScore = score;
                    bestMatch = faq;
                }
            }
        }
        if (bestMatch) {
            return {
                response: bestMatch.answer,
                category: bestMatch.category,
                productId: bestMatch.productId,
                confidence: 'high',
            };
        }
        // Fallback responses
        const fallbacks = [
            'Cảm ơn bạn đã liên hệ! Hiện tại tôi chưa có thông tin về vấn đề này. Bạn có thể liên hệ hotline 0909.123.456 để được hỗ trợ trực tiếp nhé!',
            'Xin lỗi, tôi chưa hiểu ý của bạn. Bạn có thể hỏi về sản phẩm, giá cả, đơn hàng hoặc chính sách giao hàng không?',
            'Tôi ở đây để giúp bạn! Bạn có thể hỏi về các sản phẩm nông sản, giá cả, cách đặt hàng hoặc dịch vụ giao hàng nhé.',
        ];
        return {
            response: fallbacks[Math.floor(Math.random() * fallbacks.length)],
            category: 'fallback',
            confidence: 'low',
        };
    }
    async createFAQ(data) {
        return prisma.chatbotFAQ.create({
            data: {
                question: data.question,
                answer: data.answer,
                keywords: data.keywords,
                category: data.category || 'general',
                productId: data.productId || null,
                priority: data.priority || 0,
                isActive: true,
            },
        });
    }
    async updateFAQ(id, data) {
        const faq = await prisma.chatbotFAQ.findUnique({ where: { id } });
        if (!faq) {
            throw { status: 404, message: 'Không tìm thấy FAQ' };
        }
        return prisma.chatbotFAQ.update({
            where: { id },
            data,
        });
    }
    async deleteFAQ(id) {
        const faq = await prisma.chatbotFAQ.findUnique({ where: { id } });
        if (!faq) {
            throw { status: 404, message: 'Không tìm thấy FAQ' };
        }
        return prisma.chatbotFAQ.delete({ where: { id } });
    }
    async getAllFAQsAdmin(params) {
        const page = params.page || 1;
        const limit = params.limit || 20;
        const { skip, take } = (0, helpers_1.paginate)(page, limit);
        const where = {};
        if (params.category)
            where.category = params.category;
        if (params.search) {
            where.OR = [
                { question: { contains: params.search, mode: 'insensitive' } },
                { answer: { contains: params.search, mode: 'insensitive' } },
            ];
        }
        const [faqs, total] = await Promise.all([
            prisma.chatbotFAQ.findMany({
                where,
                skip,
                take,
                orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
                include: { product: { select: { id: true, name: true } } },
            }),
            prisma.chatbotFAQ.count({ where }),
        ]);
        return {
            faqs,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
exports.ChatbotService = ChatbotService;
exports.chatbotService = new ChatbotService();
//# sourceMappingURL=chatbot.service.js.map