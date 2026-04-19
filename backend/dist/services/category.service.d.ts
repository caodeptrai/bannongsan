export declare class CategoryService {
    getAll(): Promise<({
        _count: {
            products: number;
        };
        children: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            description: string | null;
            image: string | null;
            parentId: string | null;
            isActive: boolean;
            sortOrder: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        image: string | null;
        parentId: string | null;
        isActive: boolean;
        sortOrder: number;
    })[]>;
    getAllAdmin(): Promise<({
        _count: {
            products: number;
        };
        children: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            description: string | null;
            image: string | null;
            parentId: string | null;
            isActive: boolean;
            sortOrder: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        image: string | null;
        parentId: string | null;
        isActive: boolean;
        sortOrder: number;
    })[]>;
    getById(id: string): Promise<{
        _count: {
            products: number;
        };
        children: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            description: string | null;
            image: string | null;
            parentId: string | null;
            isActive: boolean;
            sortOrder: number;
        }[];
        products: {
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
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        image: string | null;
        parentId: string | null;
        isActive: boolean;
        sortOrder: number;
    }>;
    create(data: {
        name: string;
        slug?: string | null;
        description?: string;
        image?: string;
        parentId?: string;
        sortOrder?: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        image: string | null;
        parentId: string | null;
        isActive: boolean;
        sortOrder: number;
    }>;
    update(id: string, data: {
        name?: string;
        slug?: string;
        description?: string;
        image?: string;
        parentId?: string;
        sortOrder?: number;
        isActive?: boolean;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        image: string | null;
        parentId: string | null;
        isActive: boolean;
        sortOrder: number;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        image: string | null;
        parentId: string | null;
        isActive: boolean;
        sortOrder: number;
    }>;
}
export declare const categoryService: CategoryService;
//# sourceMappingURL=category.service.d.ts.map