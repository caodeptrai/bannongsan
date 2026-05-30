export declare class CartService {
    private canAccessCart;
    getCart(userId: string | null | undefined, sessionId?: string | null): Promise<{
        cart: null;
        items: never[];
        subtotal: number;
        itemCount: number;
    } | {
        cart: {
            items: ({
                product: {
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
                updatedAt: Date;
                productId: string;
                quantity: number;
                cartId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            sessionId: string | null;
        };
        items: ({
            product: {
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
            updatedAt: Date;
            productId: string;
            quantity: number;
            cartId: string;
        })[];
        subtotal: number;
        itemCount: number;
    }>;
    addItem(userId: string | null | undefined, sessionId: string | null | undefined, productId: string, quantity: number): Promise<{
        cart: null;
        items: never[];
        subtotal: number;
        itemCount: number;
    } | {
        cart: {
            items: ({
                product: {
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
                updatedAt: Date;
                productId: string;
                quantity: number;
                cartId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            sessionId: string | null;
        };
        items: ({
            product: {
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
            updatedAt: Date;
            productId: string;
            quantity: number;
            cartId: string;
        })[];
        subtotal: number;
        itemCount: number;
    }>;
    updateItem(cartItemId: string, quantity: number, userId?: string | null, sessionId?: string | null): Promise<{
        message: string;
    }>;
    removeItem(cartItemId: string, userId?: string | null, sessionId?: string | null): Promise<{
        message: string;
    }>;
    clearCart(userId?: string | null, sessionId?: string | null): Promise<{
        message: string;
    }>;
    mergeCart(userId: string, sessionId: string): Promise<{
        cart: null;
        items: never[];
        subtotal: number;
        itemCount: number;
    } | {
        cart: {
            items: ({
                product: {
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
                updatedAt: Date;
                productId: string;
                quantity: number;
                cartId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            sessionId: string | null;
        };
        items: ({
            product: {
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
            updatedAt: Date;
            productId: string;
            quantity: number;
            cartId: string;
        })[];
        subtotal: number;
        itemCount: number;
    }>;
}
export declare const cartService: CartService;
//# sourceMappingURL=cart.service.d.ts.map