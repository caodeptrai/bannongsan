import { Request, Response } from 'express';
import { settingService } from '../services/setting.service';

export class SettingController {
  async getSettings(req: Request, res: Response) {
    try {
      const settings = await settingService.getSettings();
      res.json({ success: true, data: settings });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async updateSettings(req: Request, res: Response) {
    try {
      const settings = await settingService.updateSettings(req.body);
      res.json({ success: true, message: 'Cập nhật cấu hình hệ thống thành công', data: settings });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }
}

export const settingController = new SettingController();
