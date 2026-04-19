import { Request, Response } from 'express';
import { AuthRequest } from '../types';
export declare class OrderController {
    create(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getMyOrders(req: AuthRequest, res: Response): Promise<void>;
    getMyOrderById(req: AuthRequest, res: Response): Promise<void>;
    cancelOrder(req: AuthRequest, res: Response): Promise<void>;
    getAllOrders(req: Request, res: Response): Promise<void>;
    getOrderDetail(req: Request, res: Response): Promise<void>;
    updateStatus(req: Request, res: Response): Promise<void>;
    getStatistics(req: Request, res: Response): Promise<void>;
}
export declare const orderController: OrderController;
//# sourceMappingURL=order.controller.d.ts.map