import { Request, Response } from 'express';
import { categoryService } from '../services/category.service';

export class CategoryController {
  async getAll(req: Request, res: Response) {
    try {
      const categories = await categoryService.getAll();
      res.json({ success: true, data: categories });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAllAdmin(req: Request, res: Response) {
    try {
      const categories = await categoryService.getAllAdmin();
      res.json({ success: true, data: categories });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const category = await categoryService.getById(req.params.id);
      res.json({ success: true, data: category });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const category = await categoryService.create(req.body);
      res.status(201).json({ success: true, message: 'Tạo danh mục thành công', data: category });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const category = await categoryService.update(req.params.id, req.body);
      res.json({ success: true, message: 'Cập nhật danh mục thành công', data: category });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await categoryService.delete(req.params.id);
      res.json({ success: true, message: 'Xóa danh mục thành công' });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }
}

export const categoryController = new CategoryController();
