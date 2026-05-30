export declare class AuthService {
    register(data: {
        email: string;
        password: string;
        fullName: string;
        phone?: string;
    }): Promise<{
        user: {
            id: string;
            email: string;
            fullName: string;
            role: import(".prisma/client").$Enums.Role;
            status: import(".prisma/client").$Enums.UserStatus;
            createdAt: Date;
        };
        token: string;
    }>;
    login(email: string, password: string): Promise<{
        user: {
            id: string;
            email: string;
            fullName: string;
            phone: string | null;
            address: string | null;
            role: import(".prisma/client").$Enums.Role;
            status: "ACTIVE";
            avatar: string | null;
            createdAt: Date;
        };
        token: string;
    }>;
    getProfile(userId: string): Promise<{
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
            orders: number;
        };
    }>;
    updateProfile(userId: string, data: {
        fullName?: string;
        phone?: string;
        address?: string;
    }): Promise<{
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
    }>;
    changePassword(userId: string, oldPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
}
export declare const authService: AuthService;
//# sourceMappingURL=auth.service.d.ts.map