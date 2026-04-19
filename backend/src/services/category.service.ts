import { PrismaClient } from '@prisma/client';
import { slugify } from '../utils/helpers';

const prisma = new PrismaClient();

export class CategoryService {
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

  async getById(id: string) {
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

  async create(data: { name: string; slug?: string | null; description?: string; image?: string; parentId?: string; sortOrder?: number }) {
    const slugToUse = data.slug || slugify(data.name);
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

  async update(id: string, data: { name?: string; slug?: string; description?: string; image?: string; parentId?: string; sortOrder?: number; isActive?: boolean }) {
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

  async delete(id: string) {
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

export const categoryService = new CategoryService();
