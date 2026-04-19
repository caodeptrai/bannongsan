import { body, param, query } from 'express-validator';

export const registerValidation = [
  body('email').isEmail().withMessage('Email không hợp lệ').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
  body('fullName').trim().notEmpty().withMessage('Họ tên không được để trống'),
  body('phone').optional().matches(/^[0-9]{10,11}$/).withMessage('Số điện thoại không hợp lệ'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Email không hợp lệ').normalizeEmail(),
  body('password').notEmpty().withMessage('Mật khẩu không được để trống'),
];

export const updateProfileValidation = [
  body('fullName').optional().trim().notEmpty().withMessage('Họ tên không được để trống'),
  body('phone').optional().matches(/^[0-9]{10,11}$/).withMessage('Số điện thoại không hợp lệ'),
  body('address').optional().trim(),
];

export const productValidation = [
  body('name').trim().notEmpty().withMessage('Tên sản phẩm không được để trống'),
  body('price').isFloat({ min: 0 }).withMessage('Giá phải là số dương'),
  body('categoryId').isUUID().withMessage('ID danh mục không hợp lệ'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Số lượng tồn kho phải là số nguyên dương'),
  body('unit').optional().trim().notEmpty().withMessage('Đơn vị không được để trống'),
];

export const categoryValidation = [
  body('name').trim().notEmpty().withMessage('Tên danh mục không được để trống'),
  body('slug').optional().trim().matches(/^[a-z0-9-]+$/).withMessage('Slug chỉ chứa chữ thường, số và dấu gạch ngang'),
];

export const cartItemValidation = [
  body('productId').isUUID().withMessage('ID sản phẩm không hợp lệ'),
  body('quantity').isInt({ min: 1 }).withMessage('Số lượng phải lớn hơn 0'),
];

export const orderValidation = [
  body('shippingName').trim().notEmpty().withMessage('Tên người nhận không được để trống'),
  body('shippingPhone').matches(/^[0-9]{10,11}$/).withMessage('Số điều thoại không hợp lệ'),
  body('shippingAddress').trim().notEmpty().withMessage('Địa chỉ giao hàng không được để trống'),
  body('paymentMethod').optional().isIn(['COD', 'BANK_TRANSFER', 'MOMO', 'ZALOPAY']).withMessage('Phương thức thanh toán không hợp lệ'),
];

export const orderStatusValidation = [
  body('status').isIn(['PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED']).withMessage('Trạng thái không hợp lệ'),
  body('cancelReason').optional().trim(),
];

export const productQueryValidation = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('minPrice').optional().isFloat({ min: 0 }).toFloat(),
  query('maxPrice').optional().isFloat({ min: 0 }).toFloat(),
];

export const idParamValidation = [
  param('id').isUUID().withMessage('ID không hợp lệ'),
];

export const chatbotValidation = [
  body('message').trim().notEmpty().withMessage('Tin nhắn không được để trống'),
];
