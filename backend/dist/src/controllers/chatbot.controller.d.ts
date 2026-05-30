import { Request, Response } from 'express';
export declare class ChatbotController {
    getResponse(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getAllFAQs(req: Request, res: Response): Promise<void>;
    createFAQ(req: Request, res: Response): Promise<void>;
    updateFAQ(req: Request, res: Response): Promise<void>;
    deleteFAQ(req: Request, res: Response): Promise<void>;
    getAllFAQsAdmin(req: Request, res: Response): Promise<void>;
}
export declare const chatbotController: ChatbotController;
//# sourceMappingURL=chatbot.controller.d.ts.map