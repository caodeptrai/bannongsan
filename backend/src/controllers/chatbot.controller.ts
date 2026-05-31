import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { chatbotService } from '../services/chatbot.service';

export class ChatbotController {
  async getResponse(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ', errors: errors.array() });
      }

      const { message } = req.body;
      const result = await chatbotService.getResponse(message);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async getAllFAQs(req: Request, res: Response) {
    try {
      const faqs = await chatbotService.getAllFAQs();
      res.json({ success: true, data: faqs });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async createFAQ(req: Request, res: Response) {
    try {
      const faq = await chatbotService.createFAQ(req.body);
      res.status(201).json({ success: true, message: 'Tạo FAQ thành công', data: faq });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateFAQ(req: Request, res: Response) {
    try {
      const faq = await chatbotService.updateFAQ(req.params.id, req.body);
      res.json({ success: true, message: 'Cập nhật FAQ thành công', data: faq });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async deleteFAQ(req: Request, res: Response) {
    try {
      await chatbotService.deleteFAQ(req.params.id);
      res.json({ success: true, message: 'Xóa FAQ thành công' });
    } catch (error: any) {
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async getAllFAQsAdmin(req: Request, res: Response) {
    try {
      const { page, limit, category, search } = req.query;
      const result = await chatbotService.getAllFAQsAdmin({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        category: category as string,
        search: search as string,
      });
      res.json({ success: true, ...result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const chatbotController = new ChatbotController();
