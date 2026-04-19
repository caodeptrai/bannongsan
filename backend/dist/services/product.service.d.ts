import { Prisma } from '@prisma/client';
export declare class ProductService {
    getAll(params: {
        page?: number;
        limit?: number;
        search?: string;
        categoryId?: string;
        minPrice?: number;
        maxPrice?: number;
        inStock?: boolean;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }): Promise<{
        products: ({
            _count: {
                reviews: number;
            };
            category: {
                id: string;
                name: string;
                slug: string;
            };
            images: {
                id: string;
                createdAt: Date;
                productId: string;
                sortOrder: number;
                isPrimary: boolean;
                url: string;
                altText: string | null;
            }[];
        } & {
            unit: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            price: Prisma.Decimal;
            categoryId: string;
            stock: number;
            slug: string;
            description: string | null;
            isActive: boolean;
            soldCount: number;
            viewCount: number;
            rating: Prisma.Decimal;
            originalPrice: Prisma.Decimal | null;
            sku: string | null;
            isFeatured: boolean;
            reviewCount: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getFeatured(limit?: number): Promise<({
        category: {
            id: string;
            name: string;
            slug: string;
        };
        images: {
            id: string;
            createdAt: Date;
            productId: string;
            sortOrder: number;
            isPrimary: boolean;
            url: string;
            altText: string | null;
        }[];
    } & {
        unit: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: Prisma.Decimal;
        categoryId: string;
        stock: number;
        slug: string;
        description: string | null;
        isActive: boolean;
        soldCount: number;
        viewCount: number;
        rating: Prisma.Decimal;
        originalPrice: Prisma.Decimal | null;
        sku: string | null;
        isFeatured: boolean;
        reviewCount: number;
    })[]>;
    getNewArrivals(limit?: number): Promise<({
        category: {
            id: string;
            name: string;
            slug: string;
        };
        images: {
            id: string;
            createdAt: Date;
            productId: string;
            sortOrder: number;
            isPrimary: boolean;
            url: string;
            altText: string | null;
        }[];
    } & {
        unit: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: Prisma.Decimal;
        categoryId: string;
        stock: number;
        slug: string;
        description: string | null;
        isActive: boolean;
        soldCount: number;
        viewCount: number;
        rating: Prisma.Decimal;
        originalPrice: Prisma.Decimal | null;
        sku: string | null;
        isFeatured: boolean;
        reviewCount: number;
    })[]>;
    getBestSellers(limit?: number): Promise<({
        category: {
            id: string;
            name: string;
            slug: string;
        };
        images: {
            id: string;
            createdAt: Date;
            productId: string;
            sortOrder: number;
            isPrimary: boolean;
            url: string;
            altText: string | null;
        }[];
    } & {
        unit: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: Prisma.Decimal;
        categoryId: string;
        stock: number;
        slug: string;
        description: string | null;
        isActive: boolean;
        soldCount: number;
        viewCount: number;
        rating: Prisma.Decimal;
        originalPrice: Prisma.Decimal | null;
        sku: string | null;
        isFeatured: boolean;
        reviewCount: number;
    })[]>;
    getById(id: string): Promise<{
        reviews: ({
            user: {
                id: string;
                fullName: string;
                avatar: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            rating: number;
            userId: string;
            comment: string | null;
        })[];
        _count: {
            reviews: number;
        };
        category: {
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
        };
        images: {
            id: string;
            createdAt: Date;
            productId: string;
            sortOrder: number;
            isPrimary: boolean;
            url: string;
            altText: string | null;
        }[];
    } & {
        unit: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: Prisma.Decimal;
        categoryId: string;
        stock: number;
        slug: string;
        description: string | null;
        isActive: boolean;
        soldCount: number;
        viewCount: number;
        rating: Prisma.Decimal;
        originalPrice: Prisma.Decimal | null;
        sku: string | null;
        isFeatured: boolean;
        reviewCount: number;
    }>;
    getBySlug(slug: string): Promise<{
        reviews: ({
            user: {
                id: string;
                fullName: string;
                avatar: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            rating: number;
            userId: string;
            comment: string | null;
        })[];
        _count: {
            reviews: number;
        };
        category: {
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
        };
        images: {
            id: string;
            createdAt: Date;
            productId: string;
            sortOrder: number;
            isPrimary: boolean;
            url: string;
            altText: string | null;
        }[];
    } & {
        unit: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: Prisma.Decimal;
        categoryId: string;
        stock: number;
        slug: string;
        description: string | null;
        isActive: boolean;
        soldCount: number;
        viewCount: number;
        rating: Prisma.Decimal;
        originalPrice: Prisma.Decimal | null;
        sku: string | null;
        isFeatured: boolean;
        reviewCount: number;
    }>;
    getRelated(productId: string, categoryId: string, limit?: number): Promise<({
        images: {
            id: string;
            createdAt: Date;
            productId: string;
            sortOrder: number;
            isPrimary: boolean;
            url: string;
            altText: string | null;
        }[];
    } & {
        unit: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: Prisma.Decimal;
        categoryId: string;
        stock: number;
        slug: string;
        description: string | null;
        isActive: boolean;
        soldCount: number;
        viewCount: number;
        rating: Prisma.Decimal;
        originalPrice: Prisma.Decimal | null;
        sku: string | null;
        isFeatured: boolean;
        reviewCount: number;
    })[]>;
    getAllAdmin(params: {
        page?: number;
        limit?: number;
        search?: string;
        categoryId?: string;
        isActive?: boolean;
    }): Promise<{
        products: ({
            _count: {
                reviews: number;
                orderItems: number;
            };
            category: {
                id: string;
                name: string;
                slug: string;
            };
            images: {
                id: string;
                createdAt: Date;
                productId: string;
                sortOrder: number;
                isPrimary: boolean;
                url: string;
                altText: string | null;
            }[];
        } & {
            unit: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            price: Prisma.Decimal;
            categoryId: string;
            stock: number;
            slug: string;
            description: string | null;
            isActive: boolean;
            soldCount: number;
            viewCount: number;
            rating: Prisma.Decimal;
            originalPrice: Prisma.Decimal | null;
            sku: string | null;
            isFeatured: boolean;
            reviewCount: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    create(data: any): Promise<{
        reviews: ({
            user: {
                id: string;
                fullName: string;
                avatar: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            rating: number;
            userId: string;
            comment: string | null;
        })[];
        _count: {
            reviews: number;
        };
        category: {
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
        };
        images: {
            id: string;
            createdAt: Date;
            productId: string;
            sortOrder: number;
            isPrimary: boolean;
            url: string;
            altText: string | null;
        }[];
    } & {
        unit: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: Prisma.Decimal;
        categoryId: string;
        stock: number;
        slug: string;
        description: string | null;
        isActive: boolean;
        soldCount: number;
        viewCount: number;
        rating: Prisma.Decimal;
        originalPrice: Prisma.Decimal | null;
        sku: string | null;
        isFeatured: boolean;
        reviewCount: number;
    }>;
    update(id: string, data: any): Promise<{
        reviews: ({
            user: {
                id: string;
                fullName: string;
                avatar: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            rating: number;
            userId: string;
            comment: string | null;
        })[];
        _count: {
            reviews: number;
        };
        category: {
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
        };
        images: {
            id: string;
            createdAt: Date;
            productId: string;
            sortOrder: number;
            isPrimary: boolean;
            url: string;
            altText: string | null;
        }[];
    } & {
        unit: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: Prisma.Decimal;
        categoryId: string;
        stock: number;
        slug: string;
        description: string | null;
        isActive: boolean;
        soldCount: number;
        viewCount: number;
        rating: Prisma.Decimal;
        originalPrice: Prisma.Decimal | null;
        sku: string | null;
        isFeatured: boolean;
        reviewCount: number;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
export declare const productService: ProductService;
//# sourceMappingURL=product.service.d.ts.map