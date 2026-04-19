import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { cartService } from '../services/cart.service';
import { AuthRequest } from '../types';

export class CartController {
  async getCart(req: AuthRequest, res: Response) {
    try {
      const sessionId = req.headers['x-session-id'] as string | undefined;
      const result = await cartService.getCart(req.user?.id || null, sessionId || null);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async addItem(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ', errors: errors.array() });
      }

      const sessionId = req.headers['x-session-id'] as string | undefined;
      const { productId, quantity } = req.body;
      const result = await cartService.addItem(req.user?.id || null, sessionId || null, productId, quantity);
      res.json({ success: true, message: 'Thêm vào giỏ hàng thành công', data: result });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async updateItem(req: AuthRequest, res: Response) {
    try {
      const { quantity } = req.body;
      await cartService.updateItem(req.params.id, quantity);
      res.json({ success: true, message: 'Cập nhật giỏ hàng thành công' });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async removeItem(req: AuthRequest, res: Response) {
    try {
      await cartService.removeItem(req.params.id);
      res.json({ success: true, message: 'Xóa sản phẩm khỏi giỏ hàng thành công' });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async clearCart(req: AuthRequest, res: Response) {
    try {
      await cartService.clearCart(req.user!.id);
      res.json({ success: true, message: 'Xóa giỏ hàng thành công' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async mergeCart(req: AuthRequest, res: Response) {
    try {
      const sessionId = req.headers['x-session-id'] as string | undefined;
      if (!sessionId) {
        return res.status(400).json({ success: false, message: 'Thiếu session ID' });
      }
      const result = await cartService.mergeCart(req.user!.id, sessionId);
      res.json({ success: true, message: 'Ghép giỏ hàng thành công', data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const cartController = new CartController();
