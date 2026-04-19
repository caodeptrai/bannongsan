"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = exports.CategoryService = void 0;
const client_1 = require("@prisma/client");
const helpers_1 = require("../utils/helpers");
const prisma = new client_1.PrismaClient();
class CategoryService {
    async getAll() {
        return prisma.category.findMany({
            where: { isActive: true, parentId: null },
            include: {
                children: {
                    where: { isActive: true },
                    orderBy: { sortOrder: 'asc' },
                },
                _count: { select: { products: true } },
            },
            orderBy: { sortOrder: 'asc' },
        });
    }
    async getAllAdmin() {
        return prisma.category.findMany({
            include: {
                children: true,
                _count: { select: { products: true } },
            },
            orderBy: { sortOrder: 'asc' },
        });
    }
    async getById(id) {
        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                children: { where: { isActive: true } },
                products: { take: 10, orderBy: { soldCount: 'desc' } },
                _count: { select: { products: true } },
            },
        });
        if (!category) {
            throw { status: 404, message: 'Không tìm thấy danh mục' };
        }
        return category;
    }
    async create(data) {
        const slugToUse = data.slug || (0, helpers_1.slugify)(data.name);
        const existing = await prisma.category.findUnique({ where: { slug: slugToUse } });
        if (existing) {
            throw { status: 400, message: 'Slug đã tồn tại' };
        }
        return prisma.category.create({
            data: {
                name: data.name,
                slug: slugToUse,
                description: data.description,
                image: data.image,
                parentId: data.parentId,
                sortOrder: data.sortOrder || 0,
            },
        });
    }
    async update(id, data) {
        if (data.slug) {
            const existing = await prisma.category.findFirst({
                where: { slug: data.slug, NOT: { id } },
            });
            if (existing) {
                throw { status: 400, message: 'Slug đã tồn tại' };
            }
        }
        return prisma.category.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        const category = await prisma.category.findUnique({
            where: { id },
            include: { _count: { select: { products: true, children: true } } },
        });
        if (!category) {
            throw { status: 404, message: 'Không tìm thấy danh mục' };
        }
        if (category._count.products > 0) {
            throw { status: 400, message: 'Không thể xóa danh mục đã có sản phẩm' };
        }
        if (category._count.children > 0) {
            throw { status: 400, message: 'Không thể xóa danh mục có danh mục con' };
        }
        return prisma.category.delete({ where: { id } });
    }
}
exports.CategoryService = CategoryService;
exports.categoryService = new CategoryService();
//# sourceMappingURL=category.service.js.map