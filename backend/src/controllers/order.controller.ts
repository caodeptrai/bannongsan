import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { orderService } from '../services/order.service';
import { AuthRequest } from '../types';

export class OrderController {
  async create(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ', errors: errors.array() });
      }

      const { items, ...shippingInfo } = req.body;
      const order = await orderService.create(req.user!.id, { items, ...shippingInfo });
      res.status(201).json({ success: true, message: 'Đặt hàng thành công', data: order });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async getMyOrders(req: AuthRequest, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const result = await orderService.getUserOrders(req.user!.id, page, limit);
      res.json({ success: true, ...result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getMyOrderById(req: AuthRequest, res: Response) {
    try {
      const order = await orderService.getOrderById(req.params.id, req.user!.id);
      res.json({ success: true, data: order });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async cancelOrder(req: AuthRequest, res: Response) {
    try {
      const { reason } = req.body;
      const order = await orderService.cancelOrder(req.params.id, req.user!.id, reason);
      res.json({ success: true, message: 'Hủy đơn hàng thành công', data: order });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  // Admin
  async getAllOrders(req: Request, res: Response) {
    try {
      const { page, limit, status, search, startDate, endDate } = req.query;
      const result = await orderService.getAllOrders({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        status: status as string,
        search: search as string,
        startDate: startDate as string,
        endDate: endDate as string,
      });
      res.json({ success: true, ...result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getOrderDetail(req: Request, res: Response) {
    try {
      const order = await orderService.getOrderDetail(req.params.id);
      res.json({ success: true, data: order });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { status, cancelReason } = req.body;
      const order = await orderService.updateStatus(req.params.id, status, cancelReason);
      res.json({ success: true, message: 'Cập nhật trạng thái thành công', data: order });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async getStatistics(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;
      const stats = await orderService.getStatistics(startDate as string, endDate as string);
      res.json({ success: true, data: stats });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const orderController = new OrderController();
