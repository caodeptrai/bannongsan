import { Request, Response } from 'express';
export declare class ProductController {
    getAll(req: Request, res: Response): Promise<void>;
    getFeatured(req: Request, res: Response): Promise<void>;
    getNewArrivals(req: Request, res: Response): Promise<void>;
    getBestSellers(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    getBySlug(req: Request, res: Response): Promise<void>;
    getRelated(req: Request, res: Response): Promise<void>;
    getAllAdmin(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
export declare const productController: ProductController;
//# sourceMappingURL=product.controller.d.ts.map