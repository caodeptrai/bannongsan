import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { authService } from '../services/auth.service';
import { AuthRequest } from '../types';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ', errors: errors.array() });
      }

      const { email, password, fullName, phone } = req.body;
      const result = await authService.register({ email, password, fullName, phone });

      res.status(201).json({
        success: true,
        message: 'Đăng ký tài khoản thành công',
        data: result,
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Lỗi server',
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ', errors: errors.array() });
      }

      const { email, password } = req.body;
      const result = await authService.login(email, password);

      res.json({
        success: true,
        message: 'Đăng nhập thành công',
        data: result,
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Lỗi server',
      });
    }
  }

  async getProfile(req: AuthRequest, res: Response) {
    try {
      const user = await authService.getProfile(req.user!.id);
      res.json({ success: true, data: user });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async updateProfile(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ', errors: errors.array() });
      }

      const user = await authService.updateProfile(req.user!.id, req.body);
      res.json({ success: true, message: 'Cập nhật hồ sơ thành công', data: user });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async changePassword(req: AuthRequest, res: Response) {
    try {
      const { oldPassword, newPassword } = req.body;
      const result = await authService.changePassword(req.user!.id, oldPassword, newPassword);
      res.json({ success: true, ...result });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }
}

export const authController = new AuthController();
