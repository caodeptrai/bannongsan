"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = exports.ProductService = void 0;
const client_1 = require("@prisma/client");
const helpers_1 = require("../utils/helpers");
const prisma = new client_1.PrismaClient();
class ProductService {
    async getAll(params) {
        const page = params.page || 1;
        const limit = params.limit || 12;
        const { skip, take } = (0, helpers_1.paginate)(page, limit);
        const where = {
            isActive: true,
        };
        if (params.search) {
            where.OR = [
                { name: { contains: params.search, mode: 'insensitive' } },
                { description: { contains: params.search, mode: 'insensitive' } },
            ];
        }
        if (params.categoryId) {
            where.categoryId = params.categoryId;
        }
        if (params.minPrice !== undefined || params.maxPrice !== undefined) {
            where.price = {};
            if (params.minPrice !== undefined)
                where.price.gte = params.minPrice;
            if (params.maxPrice !== undefined)
                where.price.lte = params.maxPrice;
        }
        if (params.inStock) {
            where.stock = { gt: 0 };
        }
        let orderBy = { createdAt: 'desc' };
        if (params.sortBy) {
            const sortField = ['price', 'soldCount', 'viewCount', 'rating', 'name'].includes(params.sortBy)
                ? params.sortBy
                : 'createdAt';
            orderBy = { [sortField]: params.sortOrder || 'desc' };
        }
        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                skip,
                take,
                orderBy,
                include: {
                    category: { select: { id: true, name: true, slug: true } },
                    images: { where: { isPrimary: true }, take: 1 },
                    _count: { select: { reviews: true } },
                },
            }),
            prisma.product.count({ where }),
        ]);
        return {
            products,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getFeatured(limit = 8) {
        return prisma.product.findMany({
            where: { isActive: true, isFeatured: true },
            take: limit,
            orderBy: { soldCount: 'desc' },
            include: {
                category: { select: { id: true, name: true, slug: true } },
                images: { where: { isPrimary: true }, take: 1 },
            },
        });
    }
    async getNewArrivals(limit = 8) {
        return prisma.product.findMany({
            where: { isActive: true },
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                category: { select: { id: true, name: true, slug: true } },
                images: { where: { isPrimary: true }, take: 1 },
            },
        });
    }
    async getBestSellers(limit = 8) {
        return prisma.product.findMany({
            where: { isActive: true },
            take: limit,
            orderBy: { soldCount: 'desc' },
            include: {
                category: { select: { id: true, name: true, slug: true } },
                images: { where: { isPrimary: true }, take: 1 },
            },
        });
    }
    async getById(id) {
        const product = await prisma.product.update({
            where: { id },
            data: { viewCount: { increment: 1 } },
            include: {
                category: true,
                images: { orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }] },
                reviews: {
                    include: { user: { select: { id: true, fullName: true, avatar: true } } },
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
                _count: { select: { reviews: true } },
            },
        });
        if (!product) {
            throw { status: 404, message: 'Không tìm thấy sản phẩm' };
        }
        return product;
    }
    async getBySlug(slug) {
        const product = await prisma.product.update({
            where: { slug },
            data: { viewCount: { increment: 1 } },
            include: {
                category: true,
                images: { orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }] },
                reviews: {
                    include: { user: { select: { id: true, fullName: true, avatar: true } } },
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
                _count: { select: { reviews: true } },
            },
        });
        if (!product) {
            throw { status: 404, message: 'Không tìm thấy sản phẩm' };
        }
        return product;
    }
    async getRelated(productId, categoryId, limit = 4) {
        return prisma.product.findMany({
            where: {
                isActive: true,
                categoryId,
                id: { not: productId },
            },
            take: limit,
            orderBy: { soldCount: 'desc' },
            include: {
                images: { where: { isPrimary: true }, take: 1 },
            },
        });
    }
    async getAllAdmin(params) {
        const page = params.page || 1;
        const limit = params.limit || 20;
        const { skip, take } = (0, helpers_1.paginate)(page, limit);
        const where = {};
        if (params.search) {
            where.OR = [
                { name: { contains: params.search, mode: 'insensitive' } },
                { sku: { contains: params.search, mode: 'insensitive' } },
            ];
        }
        if (params.categoryId)
            where.categoryId = params.categoryId;
        if (params.isActive !== undefined)
            where.isActive = params.isActive;
        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
                include: {
                    category: { select: { id: true, name: true, slug: true } },
                    images: { where: { isPrimary: true }, take: 1 },
                    _count: { select: { orderItems: true, reviews: true } },
                },
            }),
            prisma.product.count({ where }),
        ]);
        return {
            products,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async create(data) {
        const slug = data.slug || (0, helpers_1.slugify)(data.name);
        const existing = await prisma.product.findUnique({ where: { slug } });
        if (existing) {
            throw { status: 400, message: 'Slug đã tồn tại' };
        }
        const product = await prisma.product.create({
            data: {
                name: data.name,
                slug,
                description: data.description,
                price: data.price,
                originalPrice: data.originalPrice,
                unit: data.unit || 'kg',
                stock: data.stock || 0,
                sku: data.sku,
                categoryId: data.categoryId,
                isFeatured: data.isFeatured || false,
                isActive: data.isActive !== undefined ? data.isActive : true,
            },
        });
        if (data.images && data.images.length > 0) {
            await prisma.productImage.createMany({
                data: data.images.map((url, index) => ({
                    productId: product.id,
                    url,
                    isPrimary: index === 0,
                    sortOrder: index,
                })),
            });
        }
        return this.getById(product.id);
    }
    async update(id, data) {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) {
            throw { status: 404, message: 'Không tìm thấy sản phẩm' };
        }
        const updateData = { ...data };
        if (data.name && !data.slug) {
            updateData.slug = (0, helpers_1.slugify)(data.name);
        }
        if (data.slug && data.slug !== product.slug) {
            const existing = await prisma.product.findUnique({ where: { slug: data.slug } });
            if (existing) {
                throw { status: 400, message: 'Slug đã tồn tại' };
            }
        }
        await prisma.product.update({
            where: { id },
            data: updateData,
        });
        if (data.images && data.images.length > 0) {
            await prisma.productImage.deleteMany({ where: { productId: id } });
            await prisma.productImage.createMany({
                data: data.images.map((url, index) => ({
                    productId: id,
                    url,
                    isPrimary: index === 0,
                    sortOrder: index,
                })),
            });
        }
        return this.getById(id);
    }
    async delete(id) {
        const product = await prisma.product.findUnique({
            where: { id },
            include: { _count: { select: { orderItems: true } } },
        });
        if (!product) {
            throw { status: 404, message: 'Không tìm thấy sản phẩm' };
        }
        if (product._count.orderItems > 0) {
            await prisma.product.update({ where: { id }, data: { isActive: false } });
            return { message: 'Sản phẩm đã bị vô hiệu hóa (có đơn hàng liên quan)' };
        }
        await prisma.product.delete({ where: { id } });
        return { message: 'Xóa sản phẩm thành công' };
    }
}
exports.ProductService = ProductService;
exports.productService = new ProductService();
//# sourceMappingURL=product.service.js.map