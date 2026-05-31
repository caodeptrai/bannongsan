import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { productService } from '../services/product.service';

export class ProductController {
  private uploadedImageUrls(req: Request): string[] {
    const files = req.files as Express.Multer.File[] | undefined;
    if (!files?.length) return [];

    const origin = `${req.protocol}://${req.get('host')}`;
    return files.map((file) => `${origin}/uploads/${file.filename}`);
  }

  private buildProductPayload(req: Request) {
    const data: any = { ...req.body };

    if (data.price !== undefined) data.price = Number(data.price);
    if (data.originalPrice === '') data.originalPrice = null;
    if (data.originalPrice !== undefined && data.originalPrice !== null) data.originalPrice = Number(data.originalPrice);
    if (data.stock !== undefined && data.stock !== '') data.stock = Number(data.stock);
    if (data.isFeatured !== undefined) data.isFeatured = data.isFeatured === true || data.isFeatured === 'true';
    if (data.isActive !== undefined) data.isActive = data.isActive === true || data.isActive === 'true';

    const uploadedImages = this.uploadedImageUrls(req);
    if (uploadedImages.length) {
      data.images = uploadedImages;
    } else if (typeof data.images === 'string') {
      try {
        const parsed = JSON.parse(data.images);
        data.images = Array.isArray(parsed) ? parsed : [data.images];
      } catch {
        data.images = [data.images];
      }
    }

    return data;
  }

  async getAll(req: Request, res: Response) {
    try {
      const { page, limit, search, categoryId, minPrice, maxPrice, inStock, sortBy, sortOrder } = req.query;
      const result = await productService.getAll({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        search: search as string,
        categoryId: categoryId as string,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        inStock: inStock === 'true',
        sortBy: sortBy as string,
        sortOrder: sortOrder as 'asc' | 'desc',
      });

      res.json({ success: true, ...result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getFeatured(req: Request, res: Response) {
    try {
      const products = await productService.getFeatured(Number(req.query.limit) || 8);
      res.json({ success: true, data: products });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getNewArrivals(req: Request, res: Response) {
    try {
      const products = await productService.getNewArrivals(Number(req.query.limit) || 8);
      res.json({ success: true, data: products });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getBestSellers(req: Request, res: Response) {
    try {
      const products = await productService.getBestSellers(Number(req.query.limit) || 8);
      res.json({ success: true, data: products });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const product = await productService.getById(req.params.id);
      res.json({ success: true, data: product });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async getBySlug(req: Request, res: Response) {
    try {
      const product = await productService.getBySlug(req.params.slug);
      res.json({ success: true, data: product });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async getRelated(req: Request, res: Response) {
    try {
      const { productId, categoryId } = req.params;
      const products = await productService.getRelated(productId, categoryId, Number(req.query.limit) || 4);
      res.json({ success: true, data: products });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Admin
  async getAllAdmin(req: Request, res: Response) {
    try {
      const { page, limit, search, categoryId, isActive } = req.query;
      const result = await productService.getAllAdmin({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        search: search as string,
        categoryId: categoryId as string,
        isActive: isActive !== undefined ? isActive === 'true' : undefined,
      });
      res.json({ success: true, ...result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ', errors: errors.array() });
      }

      const product = await productService.create(this.buildProductPayload(req));
      res.status(201).json({ success: true, message: 'Tạo sản phẩm thành công', data: product });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const product = await productService.update(req.params.id, this.buildProductPayload(req));
      res.json({ success: true, message: 'Cập nhật sản phẩm thành công', data: product });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const result = await productService.delete(req.params.id);
      res.json({ success: true, ...result });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }
}

export const productController = new ProductController();
