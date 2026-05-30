import { PrismaClient } from '@prisma/client';
import { slugify, paginate } from '../utils/helpers';
import { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductService {
  async getAll(params: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const page = params.page || 1;
    const limit = params.limit || 12;
    const { skip, take } = paginate(page, limit);

    const where: any = {
      isActive: true,
    };

    if (params.search) {
      where.OR = [
        { name: { contains: params.search } },
        { description: { contains: params.search } },
      ];
    }

    if (params.categoryId) {
      where.categoryId = params.categoryId;
    }

    if (params.minPrice !== undefined || params.maxPrice !== undefined) {
      where.price = {};
      if (params.minPrice !== undefined) where.price.gte = params.minPrice;
      if (params.maxPrice !== undefined) where.price.lte = params.maxPrice;
    }

    if (params.inStock) {
      where.stock = { gt: 0 };
    }

    let orderBy: any = { createdAt: 'desc' };
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

  async getById(id: string) {
    const exists = await prisma.product.findUnique({ where: { id }, select: { id: true } });
    if (!exists) {
      throw { status: 404, message: 'Không tìm thấy sản phẩm' };
    }

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

    return product;
  }

  async getBySlug(slug: string) {
    const exists = await prisma.product.findUnique({ where: { slug }, select: { slug: true } });
    if (!exists) {
      throw { status: 404, message: 'Không tìm thấy sản phẩm' };
    }

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

    return product;
  }

  async getRelated(productId: string, categoryId: string, limit = 4) {
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

  async getAllAdmin(params: { page?: number; limit?: number; search?: string; categoryId?: string; isActive?: boolean }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const { skip, take } = paginate(page, limit);

    const where: any = {};
    if (params.search) {
      where.OR = [
        { name: { contains: params.search } },
        { sku: { contains: params.search } },
      ];
    }
    if (params.categoryId) where.categoryId = params.categoryId;
    if (params.isActive !== undefined) where.isActive = params.isActive;

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

  async create(data: any) {
    const slug = data.slug || slugify(data.name);

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

    if (Array.isArray(data.images) && data.images.length > 0) {
      await prisma.productImage.createMany({
        data: data.images.map((url: string, index: number) => ({
          productId: product.id,
          url,
          isPrimary: index === 0,
          sortOrder: index,
        })),
      });
    }

    return this.getById(product.id);
  }

  async update(id: string, data: any) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw { status: 404, message: 'Không tìm thấy sản phẩm' };
    }

    const updateData: any = {};
    const allowedFields = [
      'name',
      'slug',
      'description',
      'price',
      'originalPrice',
      'unit',
      'stock',
      'sku',
      'categoryId',
      'isFeatured',
      'isActive',
    ];
    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }

    if (data.name && !data.slug) {
      updateData.slug = slugify(data.name);
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

    if (Array.isArray(data.images) && data.images.length > 0) {
      await prisma.productImage.deleteMany({ where: { productId: id } });
      await prisma.productImage.createMany({
        data: data.images.map((url: string, index: number) => ({
          productId: id,
          url,
          isPrimary: index === 0,
          sortOrder: index,
        })),
      });
    }

    return this.getById(id);
  }

  async delete(id: string) {
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

export const productService = new ProductService();
