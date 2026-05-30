"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatbotService = exports.ChatbotService = void 0;
const client_1 = require("@prisma/client");
const configs_1 = require("../configs");
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
        const normalizedMessage = userMessage.trim();
        if (!normalizedMessage) {
            throw { status: 400, message: 'Message is required' };
        }
        if (!configs_1.config.openRouter.apiKey) {
            throw { status: 503, message: 'OPENROUTER_API_KEY is not configured' };
        }
        const websiteContext = await this.buildWebsiteContext();
        const response = await this.askOpenRouter(normalizedMessage, websiteContext);
        return {
            response,
            category: 'openrouter',
            confidence: 'high',
            source: 'openrouter',
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
            throw { status: 404, message: 'Khong tim thay FAQ' };
        }
        return prisma.chatbotFAQ.update({
            where: { id },
            data,
        });
    }
    async deleteFAQ(id) {
        const faq = await prisma.chatbotFAQ.findUnique({ where: { id } });
        if (!faq) {
            throw { status: 404, message: 'Khong tim thay FAQ' };
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
                { question: { contains: params.search } },
                { answer: { contains: params.search } },
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
    async askOpenRouter(userMessage, websiteContext) {
        const endpoint = `${configs_1.config.openRouter.baseUrl.replace(/\/$/, '')}/chat/completions`;
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${configs_1.config.openRouter.apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': configs_1.config.openRouter.siteUrl,
                'X-Title': configs_1.config.openRouter.appName,
            },
            body: JSON.stringify({
                model: configs_1.config.openRouter.model,
                messages: [
                    {
                        role: 'system',
                        content: [
                            'Ban la chatbot tu van cho website WebBanHoaQua.',
                            'Chi tra loi dua tren WEBSITE_CONTEXT duoc cung cap.',
                            'Neu context khong co thong tin, hay noi hien website chua co thong tin do va huong dan khach lien he hotline 0901 234 567.',
                            'Khong tu bia gia, ton kho, khuyen mai, chinh sach, dia chi, email hoac thoi gian giao hang.',
                            'Tra loi bang tieng Viet, ngan gon, than thien va uu tien thong tin san pham, gia, ton kho, giao hang, thanh toan, doi tra.',
                        ].join(' '),
                    },
                    {
                        role: 'system',
                        content: `WEBSITE_CONTEXT:\n${websiteContext}`,
                    },
                    {
                        role: 'user',
                        content: userMessage,
                    },
                ],
                temperature: 0.2,
                max_tokens: 700,
            }),
        });
        if (!res.ok) {
            const errorText = await res.text();
            throw {
                status: 502,
                message: `OpenRouter request failed (${res.status}): ${this.truncate(errorText, 500)}`,
            };
        }
        const data = (await res.json());
        const content = data.choices?.[0]?.message?.content?.trim();
        if (!content) {
            throw { status: 502, message: 'OpenRouter returned an empty response' };
        }
        return content;
    }
    async buildWebsiteContext() {
        const [categories, products, faqs] = await Promise.all([
            prisma.category.findMany({
                where: { isActive: true },
                orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    description: true,
                    parentId: true,
                },
            }),
            prisma.product.findMany({
                where: { isActive: true },
                orderBy: [{ isFeatured: 'desc' }, { soldCount: 'desc' }, { name: 'asc' }],
                include: {
                    category: { select: { name: true, slug: true } },
                    images: {
                        where: { isPrimary: true },
                        take: 1,
                        select: { url: true, altText: true },
                    },
                },
            }),
            prisma.chatbotFAQ.findMany({
                where: { isActive: true },
                orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
                select: {
                    question: true,
                    answer: true,
                    keywords: true,
                    category: true,
                    productId: true,
                },
            }),
        ]);
        const categoryLines = categories.map((category) => {
            const parent = category.parentId ? `, parentId: ${category.parentId}` : '';
            const description = category.description ? `, mo ta: ${category.description}` : '';
            return `- ${category.name} (id: ${category.id}, slug: ${category.slug || 'none'}${parent}${description})`;
        });
        const productLines = products.map((product) => {
            const image = product.images[0]?.url ? `, anh: ${product.images[0].url}` : '';
            const originalPrice = product.originalPrice ? `, gia goc: ${this.formatMoney(product.originalPrice)} VND` : '';
            const description = product.description ? `, mo ta: ${product.description}` : '';
            return [
                `- ${product.name}`,
                `id: ${product.id}`,
                `slug: ${product.slug}`,
                `danh muc: ${product.category.name}`,
                `gia: ${this.formatMoney(product.price)} VND/${product.unit}`,
                `ton kho: ${product.stock} ${product.unit}`,
                `SKU: ${product.sku || 'none'}`,
                `noi bat: ${product.isFeatured ? 'co' : 'khong'}`,
                `da ban: ${product.soldCount}`,
                `danh gia: ${this.formatDecimal(product.rating)}/5 (${product.reviewCount} luot)${originalPrice}${image}${description}`,
            ].join(', ');
        });
        const faqLines = faqs.map((faq) => {
            const product = faq.productId ? `, productId: ${faq.productId}` : '';
            const keywords = faq.keywords ? `, tu khoa: ${faq.keywords}` : '';
            return `- Q: ${faq.question}\n  A: ${faq.answer} (nhom: ${faq.category || 'general'}${product}${keywords})`;
        });
        return [
            'THONG TIN CUA HANG:',
            '- Ten website/cua hang: WebBanHoaQua.',
            '- Linh vuc: ban nong san, trai cay va thuc pham tuoi truc tuyen.',
            '- Hotline/Zalo: 0901 234 567.',
            '- Email: contact@webbanhoaqua.com.',
            '- Dia chi: 123 Duong ABC, Quan 1, TP.HCM.',
            '- Gio mo cua: 7:00-21:00, thu 2 den chu nhat, ke ca ngay le.',
            '',
            'CHINH SACH MUA HANG:',
            '- Dat hang tren website bang cach chon san pham, them vao gio va dat hang.',
            '- Ho tro thanh toan COD, chuyen khoan ngan hang, MoMo va ZaloPay neu duoc cau hinh trong website.',
            '- Phi giao hang: don tu 500.000d mien phi; don tu 200.000d den duoi 500.000d phi 15.000d; don duoi 200.000d phi 25.000d.',
            '- Noi thanh TP.HCM giao trong 24h; cac tinh khac 2-5 ngay tuy khoang cach.',
            '- Doi tra/hoan tien khi san pham hu hong do van chuyen hoac khong dung mo ta; khach can gui hinh anh va lien he hotline trong 24h.',
            '',
            `DANH MUC DANG HIEN THI (${categories.length}):`,
            categoryLines.join('\n') || '- Chua co danh muc dang hoat dong.',
            '',
            `SAN PHAM DANG BAN (${products.length}):`,
            productLines.join('\n') || '- Chua co san pham dang ban.',
            '',
            `FAQ DANG BAT (${faqs.length}):`,
            faqLines.join('\n') || '- Chua co FAQ dang bat.',
        ].join('\n');
    }
    formatMoney(value) {
        return this.formatDecimal(value);
    }
    formatDecimal(value) {
        if (typeof value === 'object' && value && 'toString' in value) {
            return value.toString();
        }
        return String(value);
    }
    truncate(value, maxLength) {
        if (value.length <= maxLength)
            return value;
        return `${value.slice(0, maxLength)}...`;
    }
}
exports.ChatbotService = ChatbotService;
exports.chatbotService = new ChatbotService();
//# sourceMappingURL=chatbot.service.js.map