"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = exports.ProductController = void 0;
const express_validator_1 = require("express-validator");
const product_service_1 = require("../services/product.service");
class ProductController {
    async getAll(req, res) {
        try {
            const { page, limit, search, categoryId, minPrice, maxPrice, inStock, sortBy, sortOrder } = req.query;
            const result = await product_service_1.productService.getAll({
                page: page ? Number(page) : undefined,
                limit: limit ? Number(limit) : undefined,
                search: search,
                categoryId: categoryId,
                minPrice: minPrice ? Number(minPrice) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined,
                inStock: inStock === 'true',
                sortBy: sortBy,
                sortOrder: sortOrder,
            });
            res.json({ success: true, ...result });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    async getFeatured(req, res) {
        try {
            const products = await product_service_1.productService.getFeatured(Number(req.query.limit) || 8);
            res.json({ success: true, data: products });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    async getNewArrivals(req, res) {
        try {
            const products = await product_service_1.productService.getNewArrivals(Number(req.query.limit) || 8);
            res.json({ success: true, data: products });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    async getBestSellers(req, res) {
        try {
            const products = await product_service_1.productService.getBestSellers(Number(req.query.limit) || 8);
            res.json({ success: true, data: products });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    async getById(req, res) {
        try {
            const product = await product_service_1.productService.getById(req.params.id);
            res.json({ success: true, data: product });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async getBySlug(req, res) {
        try {
            const product = await product_service_1.productService.getBySlug(req.params.slug);
            res.json({ success: true, data: product });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async getRelated(req, res) {
        try {
            const { productId, categoryId } = req.params;
            const products = await product_service_1.productService.getRelated(productId, categoryId, Number(req.query.limit) || 4);
            res.json({ success: true, data: products });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    // Admin
    async getAllAdmin(req, res) {
        try {
            const { page, limit, search, categoryId, isActive } = req.query;
            const result = await product_service_1.productService.getAllAdmin({
                page: page ? Number(page) : undefined,
                limit: limit ? Number(limit) : undefined,
                search: search,
                categoryId: categoryId,
                isActive: isActive !== undefined ? isActive === 'true' : undefined,
            });
            res.json({ success: true, ...result });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    async create(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ', errors: errors.array() });
            }
            const product = await product_service_1.productService.create(req.body);
            res.status(201).json({ success: true, message: 'Tạo sản phẩm thành công', data: product });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async update(req, res) {
        try {
            const product = await product_service_1.productService.update(req.params.id, req.body);
            res.json({ success: true, message: 'Cập nhật sản phẩm thành công', data: product });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
    async delete(req, res) {
        try {
            const result = await product_service_1.productService.delete(req.params.id);
            res.json({ success: true, ...result });
        }
        catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
}
exports.ProductController = ProductController;
exports.productController = new ProductController();
//# sourceMappingURL=product.controller.js.map