"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = exports.CategoryController = void 0;
const category_service_1 = require("../services/category.service");
class CategoryController {
    async getAll(req, res) {
        try {
            const categories = await category_service_1.categoryService.getAll();
            res.json({ success: true, data: categories });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    async getAllAdmin(req, res) {
        try {
            const categories = await category_service_1.categoryService.getAllAdmin();
            res.json({ success: true, data: categories });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    async getById(req, res) {
        try {
            const category = await category_service_1.categoryService.getById(req.params.id);
            res.json({ success: true, data: category });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async create(req, res) {
        try {
            const category = await category_service_1.categoryService.create(req.body);
            res.status(201).json({ success: true, message: 'Tạo danh mục thành công', data: category });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async update(req, res) {
        try {
            const category = await category_service_1.categoryService.update(req.params.id, req.body);
            res.json({ success: true, message: 'Cập nhật danh mục thành công', data: category });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async delete(req, res) {
        try {
            await category_service_1.categoryService.delete(req.params.id);
            res.json({ success: true, message: 'Xóa danh mục thành công' });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
}
exports.CategoryController = CategoryController;
exports.categoryController = new CategoryController();
//# sourceMappingURL=category.controller.js.map