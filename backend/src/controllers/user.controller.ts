import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { userService } from '../services/user.service';

export class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const { page, limit, search, role, status } = req.query;
      const result = await userService.getAll({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        search: search as string,
        role: role as string,
        status: status as string,
      });
      res.json({ success: true, ...result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const user = await userService.getById(req.params.id);
      res.json({ success: true, data: user });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;
      const user = await userService.updateStatus(req.params.id, status);
      res.json({ success: true, message: 'Cập nhật trạng thái thành công', data: user });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async getDashboardStats(req: Request, res: Response) {
    try {
      const stats = await userService.getDashboardStats();
      res.json({ success: true, data: stats });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const userController = new UserController();
