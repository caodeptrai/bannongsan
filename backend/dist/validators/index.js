"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatbotValidation = exports.idParamValidation = exports.productQueryValidation = exports.orderStatusValidation = exports.orderValidation = exports.cartItemValidation = exports.categoryValidation = exports.productValidation = exports.updateProfileValidation = exports.loginValidation = exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidation = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email không hợp lệ').normalizeEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
    (0, express_validator_1.body)('fullName').trim().notEmpty().withMessage('Họ tên không được để trống'),
    (0, express_validator_1.body)('phone').optional().matches(/^[0-9]{10,11}$/).withMessage('Số điện thoại không hợp lệ'),
];
exports.loginValidation = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email không hợp lệ').normalizeEmail(),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Mật khẩu không được để trống'),
];
exports.updateProfileValidation = [
    (0, express_validator_1.body)('fullName').optional().trim().notEmpty().withMessage('Họ tên không được để trống'),
    (0, express_validator_1.body)('phone').optional().matches(/^[0-9]{10,11}$/).withMessage('Số điện thoại không hợp lệ'),
    (0, express_validator_1.body)('address').optional().trim(),
];
exports.productValidation = [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Tên sản phẩm không được để trống'),
    (0, express_validator_1.body)('price').isFloat({ min: 0 }).withMessage('Giá phải là số dương'),
    (0, express_validator_1.body)('categoryId').isUUID().withMessage('ID danh mục không hợp lệ'),
    (0, express_validator_1.body)('stock').optional().isInt({ min: 0 }).withMessage('Số lượng tồn kho phải là số nguyên dương'),
    (0, express_validator_1.body)('unit').optional().trim().notEmpty().withMessage('Đơn vị không được để trống'),
];
exports.categoryValidation = [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Tên danh mục không được để trống'),
    (0, express_validator_1.body)('slug').optional().trim().matches(/^[a-z0-9-]+$/).withMessage('Slug chỉ chứa chữ thường, số và dấu gạch ngang'),
];
exports.cartItemValidation = [
    (0, express_validator_1.body)('productId').isUUID().withMessage('ID sản phẩm không hợp lệ'),
    (0, express_validator_1.body)('quantity').isInt({ min: 1 }).withMessage('Số lượng phải lớn hơn 0'),
];
exports.orderValidation = [
    (0, express_validator_1.body)('shippingName').trim().notEmpty().withMessage('Tên người nhận không được để trống'),
    (0, express_validator_1.body)('shippingPhone').matches(/^[0-9]{10,11}$/).withMessage('Số điều thoại không hợp lệ'),
    (0, express_validator_1.body)('shippingAddress').trim().notEmpty().withMessage('Địa chỉ giao hàng không được để trống'),
    (0, express_validator_1.body)('paymentMethod').optional().isIn(['COD', 'BANK_TRANSFER', 'MOMO', 'ZALOPAY']).withMessage('Phương thức thanh toán không hợp lệ'),
];
exports.orderStatusValidation = [
    (0, express_validator_1.body)('status').isIn(['PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED']).withMessage('Trạng thái không hợp lệ'),
    (0, express_validator_1.body)('cancelReason').optional().trim(),
];
exports.productQueryValidation = [
    (0, express_validator_1.query)('page').optional().isInt({ min: 1 }).toInt(),
    (0, express_validator_1.query)('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
    (0, express_validator_1.query)('minPrice').optional().isFloat({ min: 0 }).toFloat(),
    (0, express_validator_1.query)('maxPrice').optional().isFloat({ min: 0 }).toFloat(),
];
exports.idParamValidation = [
    (0, express_validator_1.param)('id').isUUID().withMessage('ID không hợp lệ'),
];
exports.chatbotValidation = [
    (0, express_validator_1.body)('message').trim().notEmpty().withMessage('Tin nhắn không được để trống'),
];
//# sourceMappingURL=index.js.map