import { Request, Response } from 'express';
import { AuthRequest } from '../types';
export declare class AuthController {
    register(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getProfile(req: AuthRequest, res: Response): Promise<void>;
    updateProfile(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    changePassword(req: AuthRequest, res: Response): Promise<void>;
}
export declare const authController: AuthController;
//# sourceMappingURL=auth.controller.d.ts.map