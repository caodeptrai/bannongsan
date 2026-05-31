import { Router } from 'express';
import { settingController } from '../controllers/setting.controller';
import { adminMiddleware, authMiddleware } from '../middlewares/auth';
import { settingValidation, validateRequest } from '../validators';

const router = Router();

router.get('/', settingController.getSettings);
router.put('/', authMiddleware, adminMiddleware, settingValidation, validateRequest, settingController.updateSettings);

export default router;
