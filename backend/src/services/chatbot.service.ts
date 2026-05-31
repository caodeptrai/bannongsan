import { PrismaClient } from '@prisma/client';
import { config } from '../configs';
import { paginate } from '../utils/helpers';

const prisma = new PrismaClient();

type OpenRouterMessage = {
  role: 'system' | 'user';
  content: string;
};

type WebsiteProduct = {
  name: string;
  price: string;
  originalPrice: string | null;
  unit: string;
  stock: number;
  category: string;
  description: string | null;
  isFeatured: boolean;
  soldCount: number;
  rating: string;
  reviewCount: number;
};

type WebsiteContext = {
  siteInfo: string[];
  categories: string[];
  products: WebsiteProduct[];
  faqs: Array<{
    question: string;
    answer: string;
    category: string | null;
  }>;
};

export class ChatbotService {
  async getAllFAQs() {
    return prisma.chatbotFAQ.findMany({
      where: { isActive: true },
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async getResponse(userMessage: string) {
    const context = await this.buildWebsiteContext();
    const response = await this.askOpenRouter(userMessage, context);

    return {
      response,
      category: 'openrouter',
      confidence: 'ai',
    };
  }

  private async buildWebsiteContext(): Promise<WebsiteContext> {
    const [categories, products, faqs] = await Promise.all([
      prisma.category.findMany({
        where: { isActive: true },
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
        include: { _count: { select: { products: true } } },
      }),
      prisma.product.findMany({
        where: { isActive: true },
        orderBy: [{ isFeatured: 'desc' }, { soldCount: 'desc' }, { createdAt: 'desc' }],
        include: {
          category: { select: { name: true } },
          _count: { select: { reviews: true } },
        },
      }),
      prisma.chatbotFAQ.findMany({
        where: { isActive: true },
        orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
      }),
    ]);

    return {
      siteInfo: [
        'Tên website: WebBanHoaQua - website bán nông sản, hoa quả và thực phẩm tươi trực tuyến.',
        'Sứ mệnh: Mang thiên nhiên đến từng gia đình.',
        'Cam kết: nông sản tươi, chất lượng cao, nguồn gốc rõ ràng và được kiểm tra chất lượng nghiêm ngặt.',
        'Địa chỉ: 123 Đường Nông Sản, Quận 1, TP.HCM.',
        'Hotline: 0909.123.456.',
        'Email: contact@webbanhoaqua.com.',
        'Giờ làm việc: 7:00 - 21:00 tất cả các ngày trong tuần.',
        'Giao hàng: 2-4 giờ trong nội thành TP.HCM.',
        'Đổi trả: trong 24 giờ nếu sản phẩm không đạt chất lượng.',
        'Thanh toán: hỗ trợ COD, chuyển khoản ngân hàng, MoMo và ZaloPay.',
        'Khách hàng có thể xem sản phẩm, lọc theo danh mục/giá, thêm vào giỏ hàng, đặt hàng và theo dõi trạng thái đơn hàng trên website.',
      ],
      categories: categories.map((category) => {
        const description = category.description ? ` - ${category.description}` : '';
        return `${category.name} (${category._count.products} sản phẩm)${description}`;
      }),
      products: products.map((product) => ({
        name: product.name,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || null,
        unit: product.unit,
        stock: product.stock,
        category: product.category.name,
        description: product.description,
        isFeatured: product.isFeatured,
        soldCount: product.soldCount,
        rating: product.rating.toString(),
        reviewCount: product.reviewCount || product._count.reviews,
      })),
      faqs: faqs.map((faq) => ({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
      })),
    };
  }

  private async askOpenRouter(userMessage: string, context: WebsiteContext): Promise<string> {
    if (!config.openrouter.apiKey) {
      throw {
        status: 503,
        message: 'Chatbot chưa được cấu hình OPENROUTER_API_KEY trên server.',
      };
    }

    const messages: OpenRouterMessage[] = [
      {
        role: 'system',
        content: this.buildSystemPrompt(context),
      },
      {
        role: 'user',
        content: userMessage,
      },
    ];

    const response = await fetch(`${config.openrouter.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.openrouter.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': config.openrouter.siteUrl,
        'X-Title': config.openrouter.siteName,
      },
      body: JSON.stringify({
        model: config.openrouter.model,
        messages,
        temperature: 0.2,
        max_tokens: config.openrouter.maxTokens,
      }),
    });

    const data: any = await response.json().catch(() => null);

    if (!response.ok) {
      throw {
        status: response.status,
        message: data?.error?.message || 'OpenRouter không thể xử lý yêu cầu chatbot.',
      };
    }

    const answer = data?.choices?.[0]?.message?.content?.trim();
    if (!answer) {
      throw {
        status: 502,
        message: 'OpenRouter trả về phản hồi rỗng.',
      };
    }

    return answer;
  }

  private buildSystemPrompt(context: WebsiteContext): string {
    return `Bạn là chatbot tư vấn chính thức của WebBanHoaQua. Luôn trả lời bằng tiếng Việt, thân thiện, ngắn gọn nhưng đủ ý.

Yêu cầu bắt buộc:
- Chỉ dùng thông tin trong phần DỮ LIỆU WEBSITE bên dưới để trả lời về website, sản phẩm, giá, tồn kho, chính sách, liên hệ và cách mua hàng.
- Nếu người dùng hỏi sản phẩm còn hàng hay giá bao nhiêu, hãy dựa vào danh sách sản phẩm hiện có.
- Nếu câu hỏi nằm ngoài dữ liệu website, hãy nói bạn chưa có thông tin đó và gợi ý liên hệ hotline 0909.123.456.
- Không bịa giá, tồn kho, chính sách hoặc thông tin không có trong dữ liệu.
- Khi phù hợp, hướng dẫn khách xem sản phẩm, thêm vào giỏ hàng, đăng nhập/đăng ký, đặt hàng hoặc liên hệ cửa hàng.

DỮ LIỆU WEBSITE:
${JSON.stringify(context, null, 2)}`;
  }

  async createFAQ(data: { question: string; answer: string; keywords?: string; category?: string; productId?: string; priority?: number }) {
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

  async updateFAQ(id: string, data: any) {
    const faq = await prisma.chatbotFAQ.findUnique({ where: { id } });
    if (!faq) {
      throw { status: 404, message: 'Khong tim thay FAQ' };
    }
    return prisma.chatbotFAQ.update({
      where: { id },
      data,
    });
  }

  async deleteFAQ(id: string) {
    const faq = await prisma.chatbotFAQ.findUnique({ where: { id } });
    if (!faq) {
      throw { status: 404, message: 'Khong tim thay FAQ' };
    }
    return prisma.chatbotFAQ.delete({ where: { id } });
  }

  async getAllFAQsAdmin(params: { page?: number; limit?: number; category?: string; search?: string }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const { skip, take } = paginate(page, limit);

    const where: any = {};
    if (params.category) where.category = params.category;
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
}

export const chatbotService = new ChatbotService();
