import { Router } from 'express';
import { chatbotController } from '../controllers/chatbot.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';
import { chatbotValidation, faqAdminQueryValidation, faqUpdateValidation, faqValidation, validateRequest } from '../validators';

const router = Router();

router.post('/message', chatbotValidation, validateRequest, chatbotController.getResponse);
router.get('/faqs', chatbotController.getAllFAQs);

// Admin routes
router.get('/admin/faqs', authMiddleware, adminMiddleware, faqAdminQueryValidation, validateRequest, chatbotController.getAllFAQsAdmin);
router.post('/admin/faqs', authMiddleware, adminMiddleware, faqValidation, validateRequest, chatbotController.createFAQ);
router.put('/admin/faqs/:id', authMiddleware, adminMiddleware, faqUpdateValidation, validateRequest, chatbotController.updateFAQ);
router.delete('/admin/faqs/:id', authMiddleware, adminMiddleware, chatbotController.deleteFAQ);

export default router;
