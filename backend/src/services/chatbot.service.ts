import { OrderStatus, PaymentMethod, PaymentStatus, PrismaClient } from '@prisma/client';
import { config } from '../configs';
import { calculateShippingFee, formatCurrency, paginate } from '../utils/helpers';

const prisma = new PrismaClient();

type OpenRouterMessage = {
  role: 'system' | 'user';
  content: string;
};

type ChatIntent =
  | 'order_lookup'
  | 'sale_best_sellers'
  | 'best_sellers'
  | 'sale'
  | 'category'
  | 'product_info'
  | 'shopping_guide'
  | 'shipping'
  | 'store_info'
  | 'general';

type WebsiteContext = {
  generatedAt: string;
  store: {
    siteName: string;
    contactEmail: string | null;
    contactPhone: string | null;
    address: string | null;
    businessHours: string | null;
  };
  shoppingGuide: {
    checkoutFlow: string[];
    paymentMethods: Array<{ code: PaymentMethod; label: string }>;
    shippingFeeRules: Array<{ condition: string; fee: string }>;
    discountRules: Array<{ condition: string; discount: string }>;
    orderTracking: string;
  };
  categories: Array<{
    id: string;
    name: string;
    slug: string | null;
    description: string | null;
    productCount: number;
  }>;
  products: WebsiteProduct[];
  bestSellers: WebsiteProduct[];
  saleProducts: WebsiteProduct[];
  faqs: Array<{
    question: string;
    answer: string;
    keywords: string | null;
    category: string | null;
    productName: string | null;
  }>;
  orderLookup: OrderLookupContext;
};

type WebsiteProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  priceText: string;
  originalPrice: number | null;
  originalPriceText: string | null;
  discountPercent: number | null;
  unit: string;
  stock: number;
  category: string;
  description: string | null;
  isFeatured: boolean;
  soldCount: number;
  rating: number;
  reviewCount: number;
};

type OrderLookupContext =
  | { requested: false }
  | {
      requested: true;
      status: 'missing_order_number' | 'not_found' | 'needs_phone' | 'phone_mismatch' | 'found';
      orderNumber: string | null;
      phoneProvided: boolean;
      instruction: string;
      order?: {
        orderNumber: string;
        status: OrderStatus;
        statusText: string;
        paymentStatus: PaymentStatus;
        paymentStatusText: string;
        paymentMethod: PaymentMethod;
        paymentMethodText: string;
        subtotalText: string;
        shippingFeeText: string;
        discountText: string;
        totalText: string;
        createdAt: string;
        confirmedAt: string | null;
        shippedAt: string | null;
        completedAt: string | null;
        cancelledAt: string | null;
        cancelReason: string | null;
        itemCount: number;
        items: Array<{
          productName: string;
          quantity: number;
          priceText: string;
          totalText: string;
        }>;
      };
    };

type PromptContext = Omit<WebsiteContext, 'products' | 'bestSellers' | 'saleProducts' | 'faqs'> & {
  products: Array<Partial<WebsiteProduct>>;
  bestSellers: Array<Partial<WebsiteProduct>>;
  saleProducts: Array<Partial<WebsiteProduct>>;
  faqs: WebsiteContext['faqs'];
};

export class ChatbotService {
  async getAllFAQs() {
    return prisma.chatbotFAQ.findMany({
      where: { isActive: true },
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async getResponse(userMessage: string) {
    const context = await this.buildWebsiteContext(userMessage);
    const intent = this.detectIntent(userMessage, context);
    const quickResponse = this.buildQuickResponse(userMessage, context, intent);

    if (quickResponse) {
      return {
        message: userMessage,
        response: quickResponse,
        category: this.categoryFromIntent(intent),
        confidence: 'system',
      };
    }

    const response = await this.askOpenRouter(userMessage, this.buildPromptContext(userMessage, context, intent));

    return {
      message: userMessage,
      response,
      category: this.categoryFromIntent(intent),
      confidence: 'ai',
    };
  }

  private async buildWebsiteContext(userMessage: string): Promise<WebsiteContext> {
    const [settings, categories, products, faqs, orderLookup] = await Promise.all([
      prisma.systemSetting.findFirst({ orderBy: { updatedAt: 'desc' } }),
      prisma.category.findMany({
        where: { isActive: true },
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
        include: { _count: { select: { products: true } } },
      }),
      prisma.product.findMany({
        where: { isActive: true },
        orderBy: [{ isFeatured: 'desc' }, { soldCount: 'desc' }, { name: 'asc' }],
        include: {
          category: { select: { name: true } },
          _count: { select: { reviews: true } },
        },
      }),
      prisma.chatbotFAQ.findMany({
        where: { isActive: true },
        orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
        include: { product: { select: { name: true } } },
      }),
      this.buildOrderLookupContext(userMessage),
    ]);

    const mappedProducts = products.map((product) => this.mapProduct(product));
    const saleProducts = mappedProducts.filter((product) => product.discountPercent !== null);

    return {
      generatedAt: new Date().toISOString(),
      store: {
        siteName: settings?.siteName || config.openrouter.siteName,
        contactEmail: settings?.contactEmail || null,
        contactPhone: settings?.contactPhone || null,
        address: settings?.address || null,
        businessHours: settings?.businessHours || null,
      },
      shoppingGuide: {
        checkoutFlow: [
          'Chọn sản phẩm trên trang sản phẩm hoặc trang chủ.',
          'Thêm sản phẩm và số lượng mong muốn vào giỏ hàng.',
          'Mở giỏ hàng để kiểm tra sản phẩm, số lượng, tạm tính, phí vận chuyển và giảm giá.',
          'Đăng nhập hoặc đăng ký tài khoản trước khi thanh toán.',
          'Điền thông tin giao hàng, chọn phương thức thanh toán và xác nhận đặt hàng.',
          'Theo dõi đơn trong mục Đơn hàng của tôi hoặc cung cấp mã đơn hàng kèm số điện thoại đặt hàng cho chatbot.',
        ],
        paymentMethods: Object.values(PaymentMethod).map((method) => ({
          code: method,
          label: this.paymentMethodText(method),
        })),
        shippingFeeRules: [
          { condition: 'Tạm tính từ 500.000đ trở lên', fee: this.formatMoney(calculateShippingFee(500000)) },
          { condition: 'Tạm tính từ 200.000đ đến dưới 500.000đ', fee: this.formatMoney(calculateShippingFee(200000)) },
          { condition: 'Tạm tính dưới 200.000đ', fee: this.formatMoney(calculateShippingFee(0)) },
        ],
        discountRules: [
          { condition: 'Tạm tính từ 500.000đ trở lên', discount: 'Giảm 5% trên tạm tính đơn hàng' },
        ],
        orderTracking: 'Tra cứu đơn hàng cần mã đơn hàng và số điện thoại đặt hàng để bảo vệ thông tin khách hàng.',
      },
      categories: categories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        productCount: category._count.products,
      })),
      products: mappedProducts,
      bestSellers: [...mappedProducts]
        .sort((a, b) => b.soldCount - a.soldCount || b.rating - a.rating)
        .slice(0, 10),
      saleProducts,
      faqs: faqs.map((faq) => ({
        question: faq.question,
        answer: faq.answer,
        keywords: faq.keywords,
        category: faq.category,
        productName: faq.product?.name || null,
      })),
      orderLookup,
    };
  }

  private mapProduct(product: any): WebsiteProduct {
    const price = Number(product.price);
    const originalPrice = product.originalPrice ? Number(product.originalPrice) : null;
    const discountPercent =
      originalPrice && originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : null;

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price,
      priceText: `${this.formatMoney(price)}/${product.unit}`,
      originalPrice,
      originalPriceText: originalPrice ? `${this.formatMoney(originalPrice)}/${product.unit}` : null,
      discountPercent,
      unit: product.unit,
      stock: product.stock,
      category: product.category.name,
      description: product.description,
      isFeatured: product.isFeatured,
      soldCount: product.soldCount,
      rating: Number(product.rating),
      reviewCount: product.reviewCount || product._count.reviews,
    };
  }

  private async buildOrderLookupContext(userMessage: string): Promise<OrderLookupContext> {
    const orderNumber = this.extractOrderNumber(userMessage);
    const isOrderIntent = this.isOrderLookupIntent(userMessage);

    if (!isOrderIntent && !orderNumber) {
      return { requested: false };
    }

    const phone = this.extractPhone(userMessage);

    if (!orderNumber) {
      return {
        requested: true,
        status: 'missing_order_number',
        orderNumber: null,
        phoneProvided: Boolean(phone),
        instruction: 'Hãy hỏi khách cung cấp mã đơn hàng và số điện thoại đã dùng khi đặt hàng.',
      };
    }

    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: true,
        payment: true,
      },
    });

    if (!order) {
      return {
        requested: true,
        status: 'not_found',
        orderNumber,
        phoneProvided: Boolean(phone),
        instruction: 'Hãy nói chưa tìm thấy đơn hàng này và nhắc khách kiểm tra lại mã đơn.',
      };
    }

    if (!phone) {
      return {
        requested: true,
        status: 'needs_phone',
        orderNumber,
        phoneProvided: false,
        instruction: 'Hãy hỏi thêm số điện thoại đặt hàng, không tiết lộ chi tiết đơn khi chưa xác thực.',
      };
    }

    if (this.normalizePhone(order.shippingPhone) !== phone) {
      return {
        requested: true,
        status: 'phone_mismatch',
        orderNumber,
        phoneProvided: true,
        instruction: 'Hãy nói mã đơn hàng hoặc số điện thoại chưa khớp, không tiết lộ chi tiết đơn.',
      };
    }

    return {
      requested: true,
      status: 'found',
      orderNumber,
      phoneProvided: true,
      instruction: 'Có thể trả lời trạng thái và tóm tắt đơn hàng cho khách.',
      order: {
        orderNumber: order.orderNumber,
        status: order.status,
        statusText: this.orderStatusText(order.status),
        paymentStatus: order.paymentStatus,
        paymentStatusText: this.paymentStatusText(order.paymentStatus),
        paymentMethod: order.paymentMethod,
        paymentMethodText: this.paymentMethodText(order.paymentMethod),
        subtotalText: this.formatMoney(Number(order.subtotal)),
        shippingFeeText: this.formatMoney(Number(order.shippingFee)),
        discountText: this.formatMoney(Number(order.discount)),
        totalText: this.formatMoney(Number(order.total)),
        createdAt: order.createdAt.toISOString(),
        confirmedAt: order.confirmedAt?.toISOString() || null,
        shippedAt: order.shippedAt?.toISOString() || null,
        completedAt: order.completedAt?.toISOString() || null,
        cancelledAt: order.cancelledAt?.toISOString() || null,
        cancelReason: order.cancelReason,
        itemCount: order.items.length,
        items: order.items.map((item) => ({
          productName: item.productName,
          quantity: item.quantity,
          priceText: this.formatMoney(Number(item.price)),
          totalText: this.formatMoney(Number(item.total)),
        })),
      },
    };
  }

  private buildQuickResponse(userMessage: string, context: WebsiteContext, intent: ChatIntent): string | null {
    if (intent === 'order_lookup') {
      return this.buildOrderLookupReply(context.orderLookup, context.store);
    }

    return null;
  }

  private buildOrderLookupReply(orderLookup: OrderLookupContext, store: WebsiteContext['store']): string {
    const contact = this.contactSentence(store);

    if (!orderLookup.requested) {
      return `Dạ vâng, để tra cứu đơn hàng, anh/chị vui lòng gửi giúp em mã đơn hàng và số điện thoại đã dùng khi đặt hàng nhé.${contact}`;
    }

    if (orderLookup.status === 'missing_order_number') {
      return `Dạ vâng, anh/chị gửi giúp em mã đơn hàng và số điện thoại đặt hàng để em kiểm tra chính xác nhé.`;
    }

    if (orderLookup.status === 'not_found') {
      return `Dạ, em chưa tìm thấy đơn hàng ${orderLookup.orderNumber}. Anh/chị kiểm tra lại mã đơn giúp em, hoặc gửi thêm số điện thoại đặt hàng để em hỗ trợ kỹ hơn nhé.${contact}`;
    }

    if (orderLookup.status === 'needs_phone') {
      return `Dạ, em đã nhận mã đơn ${orderLookup.orderNumber}. Để bảo vệ thông tin đơn hàng, anh/chị gửi thêm số điện thoại đã dùng khi đặt hàng giúp em nhé.`;
    }

    if (orderLookup.status === 'phone_mismatch') {
      return `Dạ, mã đơn ${orderLookup.orderNumber} và số điện thoại anh/chị cung cấp chưa khớp với hệ thống, nên em chưa thể hiển thị chi tiết đơn hàng. Anh/chị kiểm tra lại giúp em nhé.${contact}`;
    }

    const order = orderLookup.order!;
    const itemText = order.items
      .slice(0, 4)
      .map((item) => `${item.productName} x${item.quantity}`)
      .join(', ');
    const moreItems = order.itemCount > 4 ? ` và ${order.itemCount - 4} sản phẩm khác` : '';

    return `Dạ vâng, em tra được đơn ${order.orderNumber} của anh/chị. Đơn hiện đang ở trạng thái ${order.statusText.toLowerCase()}, thanh toán ${order.paymentStatusText.toLowerCase()} bằng ${order.paymentMethodText.toLowerCase()}. Tổng thanh toán là ${order.totalText}; sản phẩm gồm ${itemText}${moreItems}.`;
  }

  private buildPromptContext(userMessage: string, context: WebsiteContext, intent: ChatIntent): PromptContext {
    const selectedProducts = this.selectProductsForPrompt(userMessage, context, intent)
      .slice(0, 12)
      .map((product) => this.compactProduct(product));

    return {
      generatedAt: context.generatedAt,
      store: context.store,
      shoppingGuide: context.shoppingGuide,
      categories: context.categories,
      products: selectedProducts,
      bestSellers: context.bestSellers.slice(0, 5).map((product) => this.compactProduct(product)),
      saleProducts: context.saleProducts.slice(0, 8).map((product) => this.compactProduct(product)),
      faqs: this.relevantFaqs(userMessage, context.faqs).slice(0, 8),
      orderLookup: context.orderLookup,
    };
  }

  private selectProductsForPrompt(userMessage: string, context: WebsiteContext, intent: ChatIntent): WebsiteProduct[] {
    const mentionedProducts = this.findMentionedProducts(userMessage, context.products, 12);
    if (mentionedProducts.length > 0) return mentionedProducts;

    const category = this.findMentionedCategory(userMessage, context.categories);
    if (category) {
      return context.products.filter((product) => this.normalizeText(product.category) === this.normalizeText(category.name));
    }

    if (intent === 'sale' || intent === 'sale_best_sellers') return context.saleProducts;
    if (intent === 'best_sellers') return context.bestSellers;
    return context.products.slice(0, 12);
  }

  private compactProduct(product: WebsiteProduct): Partial<WebsiteProduct> {
    return {
      name: product.name,
      priceText: product.priceText,
      originalPriceText: product.originalPriceText,
      discountPercent: product.discountPercent,
      stock: product.stock,
      unit: product.unit,
      category: product.category,
      soldCount: product.soldCount,
      rating: product.rating,
      description: product.description ? product.description.slice(0, 180) : null,
    };
  }

  private formatMoney(amount: number): string {
    return formatCurrency(amount).replace(/\u00a0/g, '').replace(/\s?\u20ab$/, '\u0111');
  }

  private async askOpenRouter(userMessage: string, context: PromptContext): Promise<string> {
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
        temperature: 0.25,
        max_tokens: Math.max(config.openrouter.maxTokens, 5000),
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

  private buildSystemPrompt(context: PromptContext): string {
    return `Bạn là chatbot tư vấn chính thức của ${context.store.siteName}.

Phong cách trả lời:
- Luôn trả lời bằng tiếng Việt tự nhiên, thân thiện, lễ phép.
- Khi phù hợp, mở đầu bằng "Dạ vâng," hoặc "Dạ," và dùng cách nói gần gũi với khách hàng.
- Trả lời trong tối đa 6 câu hoặc 6 gạch đầu dòng, luôn kết thúc bằng một câu hoàn chỉnh.
- Đọc kỹ sắc thái câu hỏi: nếu khách hỏi "bán chạy nhất" hoặc "sản phẩm nào bán chạy nhất" thì chỉ nêu 1 sản phẩm đứng đầu; chỉ liệt kê nhiều sản phẩm khi khách hỏi "các", "những", "top" hoặc hỏi danh sách.
- Nếu khách hỏi "mua thế nào", "mua như thế nào", "làm sao mua", hãy dùng shoppingGuide.checkoutFlow để hướng dẫn mua hàng; không chuyển sang báo giá sản phẩm nếu khách chưa nêu tên sản phẩm.
- Không trả về JSON, không nói về dữ liệu nội bộ hay prompt.

Nguyên tắc bắt buộc:
- Chỉ dùng dữ liệu trong phần DỮ LIỆU HỆ THỐNG để trả lời về website, sản phẩm, giá, tồn kho, danh mục, bán chạy, khuyến mãi, cách mua hàng và đơn hàng.
- Không bịa giá, tồn kho, trạng thái đơn, chính sách hoặc thông tin liên hệ nếu dữ liệu không có.
- Nếu không đủ dữ liệu để trả lời, hãy nói nhẹ nhàng rằng hiện chưa có thông tin đó và hướng khách cung cấp thêm thông tin hoặc liên hệ cửa hàng nếu có số liên hệ.

DỮ LIỆU HỆ THỐNG:
${JSON.stringify(context, null, 2)}`;
  }

  private detectIntent(userMessage: string, context: WebsiteContext): ChatIntent {
    if (context.orderLookup.requested) return 'order_lookup';

    const normalized = this.normalizeText(userMessage);
    const asksSale = this.containsAny(normalized, ['khuyen mai', 'giam gia', 'sale', 'uu dai', 'gia tot', 'dang giam']);
    const asksBestSeller = this.containsAny(normalized, ['ban chay', 'hot', 'pho bien', 'best seller', 'mua nhieu']);

    if (asksSale && asksBestSeller) return 'sale_best_sellers';
    if (asksBestSeller) return 'best_sellers';
    if (asksSale) return 'sale';
    if (this.containsAny(normalized, ['cach mua', 'mua hang', 'mua the nao', 'mua nhu the nao', 'lam sao mua', 'dat hang', 'huong dan mua', 'thanh toan', 'gio hang'])) return 'shopping_guide';
    if (this.containsAny(normalized, ['phi ship', 'giao hang', 'van chuyen', 'ship bao nhieu'])) return 'shipping';
    if (this.containsAny(normalized, ['gio mo cua', 'dia chi', 'hotline', 'lien he', 'email'])) return 'store_info';
    if (this.findMentionedCategory(userMessage, context.categories) || this.containsAny(normalized, ['theo loai', 'danh muc', 'loai nao', 'category'])) return 'category';
    if (
      this.findMentionedProducts(userMessage, context.products, 1).length > 0 ||
      this.containsAny(normalized, ['gia', 'bao nhieu', 'con hang', 'ton kho'])
    ) {
      return 'product_info';
    }

    return 'general';
  }

  private categoryFromIntent(intent: ChatIntent): string {
    if (intent === 'order_lookup' || intent === 'shopping_guide') return 'order';
    if (intent === 'sale' || intent === 'sale_best_sellers' || intent === 'product_info') return 'price';
    if (intent === 'best_sellers') return 'product';
    if (intent === 'category') return 'category';
    if (intent === 'shipping') return 'shipping';
    return 'general';
  }

  private isOrderLookupIntent(message: string): boolean {
    const normalized = this.normalizeText(message);
    return this.containsAny(normalized, [
      'tra cuu don',
      'theo doi don',
      'trang thai don',
      'don hang cua toi',
      'ma don',
      'order status',
      'giao toi dau',
      'van chuyen toi dau',
    ]);
  }

  private extractOrderNumber(message: string): string | null {
    const match = message.toUpperCase().match(/\b(?:ORD|WHQ)[A-Z0-9]{6,}\b/);
    return match?.[0] || null;
  }

  private extractPhone(message: string): string | null {
    const match = message.match(/(?:\+?84|0)(?:[\s.-]?\d){8,10}/);
    if (!match) return null;
    return this.normalizePhone(match[0]);
  }

  private normalizePhone(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    if (digits.startsWith('84') && digits.length >= 10) {
      return `0${digits.slice(2)}`;
    }
    return digits;
  }

  private normalizeText(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\u0111\u0110]/g, 'd');
  }

  private containsAny(value: string, needles: string[]): boolean {
    return needles.some((needle) => value.includes(needle));
  }

  private findMentionedCategory(message: string, categories: WebsiteContext['categories']) {
    const normalizedMessage = this.normalizeText(message);
    return categories.find((category) => {
      const name = this.normalizeText(category.name);
      const slug = category.slug ? this.normalizeText(category.slug) : '';
      return normalizedMessage.includes(name) || Boolean(slug && normalizedMessage.includes(slug));
    });
  }

  private findMentionedProducts(message: string, products: WebsiteProduct[], limit: number): WebsiteProduct[] {
    const normalizedMessage = this.normalizeText(message);
    const messageTerms = new Set(normalizedMessage.split(/[^a-z0-9]+/).filter((term) => term.length >= 2));
    const ignoredTerms = new Set([
      'san', 'pham', 'gia', 'bao', 'nhieu', 'con', 'hang', 'mua', 'ban', 'chay', 'khuyen', 'mai', 'giam', 'loai', 'nao',
      'toi', 'muon', 'co', 'khong', 'hay', 'cho', 'biet', 'giup', 'em', 'anh', 'chi',
    ]);

    const scored = products
      .map((product) => {
        const productName = this.normalizeText(product.name);
        const searchable = `${productName} ${this.normalizeText(product.slug)} ${this.normalizeText(product.category)}`;
        const productTerms = productName
          .split(/[^a-z0-9]+/)
          .filter((term) => term.length >= 3 && !ignoredTerms.has(term));
        let score = normalizedMessage.includes(productName) ? 20 : 0;

        for (const term of productTerms) {
          if (messageTerms.has(term)) score += 1;
        }

        if (searchable.includes(normalizedMessage) && normalizedMessage.length >= 3) score += 2;

        return { product, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || b.product.soldCount - a.product.soldCount);

    return scored.slice(0, limit).map((item) => item.product);
  }

  private relevantFaqs(message: string, faqs: WebsiteContext['faqs']) {
    const normalizedMessage = this.normalizeText(message);
    return faqs.filter((faq) => {
      const haystack = this.normalizeText(`${faq.question} ${faq.answer} ${faq.keywords || ''} ${faq.category || ''}`);
      return normalizedMessage
        .split(/\s+/)
        .filter((term) => term.length >= 3)
        .some((term) => haystack.includes(term));
    });
  }

  private contactSentence(store: WebsiteContext['store']): string {
    return store.contactPhone ? ` Anh/chị cũng có thể liên hệ hotline ${store.contactPhone} để được hỗ trợ nhanh hơn ạ.` : '';
  }

  private orderStatusText(status: OrderStatus): string {
    const labels: Record<OrderStatus, string> = {
      [OrderStatus.PENDING]: 'Chờ xác nhận',
      [OrderStatus.CONFIRMED]: 'Đã xác nhận',
      [OrderStatus.SHIPPING]: 'Đang giao',
      [OrderStatus.COMPLETED]: 'Hoàn thành',
      [OrderStatus.CANCELLED]: 'Đã hủy',
    };
    return labels[status];
  }

  private paymentStatusText(status: PaymentStatus): string {
    const labels: Record<PaymentStatus, string> = {
      [PaymentStatus.PENDING]: 'Chờ thanh toán',
      [PaymentStatus.PAID]: 'Đã thanh toán',
      [PaymentStatus.FAILED]: 'Thanh toán thất bại',
      [PaymentStatus.REFUNDED]: 'Đã hoàn tiền',
    };
    return labels[status];
  }

  private paymentMethodText(method: PaymentMethod): string {
    const labels: Record<PaymentMethod, string> = {
      [PaymentMethod.COD]: 'Thanh toán khi nhận hàng',
      [PaymentMethod.BANK_TRANSFER]: 'Chuyển khoản ngân hàng',
      [PaymentMethod.MOMO]: 'Ví MoMo',
      [PaymentMethod.ZALOPAY]: 'ZaloPay',
    };
    return labels[method];
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
      throw { status: 404, message: 'Không tìm thấy FAQ' };
    }
    return prisma.chatbotFAQ.update({
      where: { id },
      data,
    });
  }

  async deleteFAQ(id: string) {
    const faq = await prisma.chatbotFAQ.findUnique({ where: { id } });
    if (!faq) {
      throw { status: 404, message: 'Không tìm thấy FAQ' };
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
