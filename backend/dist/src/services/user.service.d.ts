export declare class UserService {
    getAll(params: {
        page?: number;
        limit?: number;
        search?: string;
        role?: string;
        status?: string;
    }): Promise<{
        users: {
            id: string;
            email: string;
            fullName: string;
            phone: string | null;
            address: string | null;
            avatar: string | null;
            role: import(".prisma/client").$Enums.Role;
            status: import(".prisma/client").$Enums.UserStatus;
            createdAt: Date;
            _count: {
                carts: number;
                orders: number;
            };
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getById(id: string): Promise<{
        id: string;
        email: string;
        fullName: string;
        phone: string | null;
        address: string | null;
        avatar: string | null;
        role: import(".prisma/client").$Enums.Role;
        status: import(".prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
        orders: {
            id: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            createdAt: Date;
            total: import("@prisma/client/runtime/library").Decimal;
            orderNumber: string;
        }[];
        _count: {
            orders: number;
        };
    }>;
    updateStatus(id: string, status: 'ACTIVE' | 'INACTIVE' | 'LOCKED'): Promise<{
        id: string;
        email: string;
        fullName: string;
        status: import(".prisma/client").$Enums.UserStatus;
        updatedAt: Date;
    }>;
    getDashboardStats(): Promise<{
        totalUsers: number;
        totalProducts: number;
        totalOrders: number;
        totalRevenue: number | import("@prisma/client/runtime/library").Decimal;
        recentOrders: ({
            user: {
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
    }>;
}
export declare const userService: UserService;
//# sourceMappingURL=user.service.d.ts.map