import { Request, Response } from 'express';
export declare class CategoryController {
    getAll(req: Request, res: Response): Promise<void>;
    getAllAdmin(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
export declare const categoryController: CategoryController;
//# sourceMappingURL=category.controller.d.ts.map