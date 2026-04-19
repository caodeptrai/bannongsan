import { Response } from 'express';
import { AuthRequest } from '../types';
export declare class CartController {
    getCart(req: AuthRequest, res: Response): Promise<void>;
    addItem(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateItem(req: AuthRequest, res: Response): Promise<void>;
    removeItem(req: AuthRequest, res: Response): Promise<void>;
    clearCart(req: AuthRequest, res: Response): Promise<void>;
    mergeCart(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
export declare const cartController: CartController;
//# sourceMappingURL=cart.controller.d.ts.map