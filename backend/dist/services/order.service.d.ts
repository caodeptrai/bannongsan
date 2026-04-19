import { OrderStatus } from '@prisma/client';
export declare class OrderService {
    create(userId: string, data: {
        shippingName: string;
        shippingPhone: string;
        shippingAddress: string;
        shippingNote?: string;
        paymentMethod?: string;
        items: Array<{
            productId: string;
            quantity: number;
        }>;
    }): Promise<{
        user: {
            id: string;
            email: string;
            fullName: string;
        };
        items: {
            id: string;
            createdAt: Date;
            price: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            quantity: number;
            productImage: string | null;
            total: import("@prisma/client/runtime/library").Decimal;
            productName: string;
            orderId: string;
        }[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        shippingName: string;
        shippingPhone: string;
        shippingAddress: string;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        cancelReason: string | null;
        total: import("@prisma/client/runtime/library").Decimal;
        userId: string;
        orderNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        shippingFee: import("@prisma/client/runtime/library").Decimal;
        discount: import("@prisma/client/runtime/library").Decimal;
        shippingNote: string | null;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        confirmedAt: Date | null;
        shippedAt: Date | null;
        completedAt: Date | null;
        cancelledAt: Date | null;
    }>;
    getUserOrders(userId: string, page?: number, limit?: number): Promise<{
        orders: ({
            _count: {
                items: number;
            };
            items: {
                id: string;
                createdAt: Date;
                price: import("@prisma/client/runtime/library").Decimal;
                productId: string;
                quantity: number;
                productImage: string | null;
                total: import("@prisma/client/runtime/library").Decimal;
                productName: string;
                orderId: string;
            }[];
        } & {
            id: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            createdAt: Date;
            updatedAt: Date;
            shippingName: string;
            shippingPhone: string;
            shippingAddress: string;
            paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
            cancelReason: string | null;
            total: import("@prisma/client/runtime/library").Decimal;
            userId: string;
            orderNumber: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            shippingFee: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            shippingNote: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            confirmedAt: Date | null;
            shippedAt: Date | null;
            completedAt: Date | null;
            cancelledAt: Date | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getOrderById(orderId: string, userId: string): Promise<{
        user: {
            id: string;
            email: string;
            fullName: string;
            phone: string | null;
        };
        items: {
            id: string;
            createdAt: Date;
            price: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            quantity: number;
            productImage: string | null;
            total: import("@prisma/client/runtime/library").Decimal;
            productName: string;
            orderId: string;
        }[];
        payment: {
            id: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
            orderId: string;
            method: import(".prisma/client").$Enums.PaymentMethod;
            amount: import("@prisma/client/runtime/library").Decimal;
            transactionId: string | null;
            paymentData: string | null;
            paidAt: Date | null;
        } | null;
    } & {
        id: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        shippingName: string;
        shippingPhone: string;
        shippingAddress: string;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        cancelReason: string | null;
        total: import("@prisma/client/runtime/library").Decimal;
        userId: string;
        orderNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        shippingFee: import("@prisma/client/runtime/library").Decimal;
        discount: import("@prisma/client/runtime/library").Decimal;
        shippingNote: string | null;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        confirmedAt: Date | null;
        shippedAt: Date | null;
        completedAt: Date | null;
        cancelledAt: Date | null;
    }>;
    cancelOrder(orderId: string, userId: string, reason?: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        shippingName: string;
        shippingPhone: string;
        shippingAddress: string;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        cancelReason: string | null;
        total: import("@prisma/client/runtime/library").Decimal;
        userId: string;
        orderNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        shippingFee: import("@prisma/client/runtime/library").Decimal;
        discount: import("@prisma/client/runtime/library").Decimal;
        shippingNote: string | null;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        confirmedAt: Date | null;
        shippedAt: Date | null;
        completedAt: Date | null;
        cancelledAt: Date | null;
    }>;
    getAllOrders(params: {
        page?: number;
        limit?: number;
        status?: string;
        search?: string;
        startDate?: string;
        endDate?: string;
    }): Promise<{
        orders: ({
            user: {
                id: string;
                email: string;
                fullName: string;
            };
            _count: {
                items: number;
            };
        } & {
            id: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            createdAt: Date;
            updatedAt: Date;
            shippingName: string;
            shippingPhone: string;
            shippingAddress: string;
            paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
            cancelReason: string | null;
            total: import("@prisma/client/runtime/library").Decimal;
            userId: string;
            orderNumber: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            shippingFee: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            shippingNote: string | null;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            confirmedAt: Date | null;
            shippedAt: Date | null;
            completedAt: Date | null;
            cancelledAt: Date | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getOrderDetail(orderId: string): Promise<{
        user: {
            id: string;
            email: string;
            fullName: string;
            phone: string | null;
            address: string | null;
        };
        items: ({
            product: {
                unit: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
                categoryId: string;
                stock: number;
                slug: string;
                description: string | null;
                isActive: boolean;
                soldCount: number;
                viewCount: number;
                rating: import("@prisma/client/runtime/library").Decimal;
                originalPrice: import("@prisma/client/runtime/library").Decimal | null;
                sku: string | null;
                isFeatured: boolean;
                reviewCount: number;
            };
        } & {
            id: string;
            createdAt: Date;
            price: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            quantity: number;
            productImage: string | null;
            total: import("@prisma/client/runtime/library").Decimal;
            productName: string;
            orderId: string;
        })[];
        payment: {
            id: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
            orderId: string;
            method: import(".prisma/client").$Enums.PaymentMethod;
            amount: import("@prisma/client/runtime/library").Decimal;
            transactionId: string | null;
            paymentData: string | null;
            paidAt: Date | null;
        } | null;
    } & {
        id: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        shippingName: string;
        shippingPhone: string;
        shippingAddress: string;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        cancelReason: string | null;
        total: import("@prisma/client/runtime/library").Decimal;
        userId: string;
        orderNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        shippingFee: import("@prisma/client/runtime/library").Decimal;
        discount: import("@prisma/client/runtime/library").Decimal;
        shippingNote: string | null;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        confirmedAt: Date | null;
        shippedAt: Date | null;
        completedAt: Date | null;
        cancelledAt: Date | null;
    }>;
    updateStatus(orderId: string, status: OrderStatus, cancelReason?: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        shippingName: string;
        shippingPhone: string;
        shippingAddress: string;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        cancelReason: string | null;
        total: import("@prisma/client/runtime/library").Decimal;
        userId: string;
        orderNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        shippingFee: import("@prisma/client/runtime/library").Decimal;
        discount: import("@prisma/client/runtime/library").Decimal;
        shippingNote: string | null;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        confirmedAt: Date | null;
        shippedAt: Date | null;
        completedAt: Date | null;
        cancelledAt: Date | null;
    } | null>;
    getStatistics(startDate?: string, endDate?: string): Promise<{
        totalOrders: number;
        pendingOrders: number;
        confirmedOrders: number;
        shippingOrders: number;
        completedOrders: number;
        cancelledOrders: number;
        totalRevenue: number;
        averageOrderValue: number;
        revenueByDate: {
            revenue: number;
            orders: number;
            date: string;
        }[];
        topProducts: {
            id: string;
            name: string;
            soldCount: number;
            revenue: number;
        }[];
    }>;
}
export declare const orderService: OrderService;
//# sourceMappingURL=order.service.d.ts.map