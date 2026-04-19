export declare class ChatbotService {
    getAllFAQs(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string | null;
        category: string | null;
        isActive: boolean;
        question: string;
        answer: string;
        keywords: string | null;
        priority: number;
    }[]>;
    getResponse(userMessage: string): Promise<{
        response: string;
        category: string | null;
        productId: string | null;
        confidence: string;
    } | {
        response: string;
        category: string;
        confidence: string;
        productId?: undefined;
    }>;
    createFAQ(data: {
        question: string;
        answer: string;
        keywords?: string;
        category?: string;
        productId?: string;
        priority?: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string | null;
        category: string | null;
        isActive: boolean;
        question: string;
        answer: string;
        keywords: string | null;
        priority: number;
    }>;
    updateFAQ(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string | null;
        category: string | null;
        isActive: boolean;
        question: string;
        answer: string;
        keywords: string | null;
        priority: number;
    }>;
    deleteFAQ(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string | null;
        category: string | null;
        isActive: boolean;
        question: string;
        answer: string;
        keywords: string | null;
        priority: number;
    }>;
    getAllFAQsAdmin(params: {
        page?: number;
        limit?: number;
        category?: string;
        search?: string;
    }): Promise<{
        faqs: ({
            product: {
                id: string;
                name: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string | null;
            category: string | null;
            isActive: boolean;
            question: string;
            answer: string;
            keywords: string | null;
            priority: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
}
export declare const chatbotService: ChatbotService;
//# sourceMappingURL=chatbot.service.d.ts.map