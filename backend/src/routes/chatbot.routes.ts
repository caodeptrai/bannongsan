import { Router } from 'express';
import { chatbotController } from '../controllers/chatbot.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';
import { chatbotValidation } from '../validators';

const router = Router();

router.post('/message', chatbotValidation, chatbotController.getResponse);
router.get('/faqs', chatbotController.getAllFAQs);

// Admin routes
router.get('/admin/faqs', authMiddleware, adminMiddleware, chatbotController.getAllFAQsAdmin);
router.post('/admin/faqs', authMiddleware, adminMiddleware, chatbotController.createFAQ);
router.put('/admin/faqs/:id', authMiddleware, adminMiddleware, chatbotController.updateFAQ);
router.delete('/admin/faqs/:id', authMiddleware, adminMiddleware, chatbotController.deleteFAQ);

export default router;
