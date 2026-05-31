import { NextFunction, Request, Response } from 'express';
import { body, param, query, validationResult } from 'express-validator';

const orderStatuses = ['PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED'];
const paymentMethods = ['COD', 'BANK_TRANSFER', 'MOMO', 'ZALOPAY'];
const userRoles = ['ADMIN', 'USER'];
const userStatuses = ['ACTIVE', 'INACTIVE', 'LOCKED'];

const dateRangeValidator = query('endDate')
  .optional({ values: 'falsy' })
  .isISO8601({ strict: true })
  .withMessage('Ngày kết thúc không hợp lệ')
  .custom((endDate, { req }) => {
    const startDate = req.query?.startDate;
    if (startDate && new Date(endDate) < new Date(startDate as string)) {
      throw new Error('Ngày kết thúc phải sau ngày bắt đầu');
    }
    return true;
  });

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Dữ liệu không hợp lệ',
      errors: errors.array(),
    });
  }

  next();
};

export const registerValidation = [
  body('email').isEmail().withMessage('Email không hợp lệ').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
  body('fullName').trim().notEmpty().withMessage('Họ tên không được để trống'),
  body('phone').optional({ values: 'falsy' }).matches(/^[0-9]{10,11}$/).withMessage('Số điện thoại không hợp lệ'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Email không hợp lệ').normalizeEmail(),
  body('password').notEmpty().withMessage('Mật khẩu không được để trống'),
];

export const changePasswordValidation = [
  body('oldPassword').notEmpty().withMessage('Mật khẩu cũ không được để trống'),
  body('newPassword').isLength({ min: 6 }).withMessage('Mật khẩu mới phải có ít nhất 6 ký tự'),
];

export const updateProfileValidation = [
  body('fullName').optional().trim().notEmpty().withMessage('Họ tên không được để trống'),
  body('phone').optional({ values: 'falsy' }).matches(/^[0-9]{10,11}$/).withMessage('Số điện thoại không hợp lệ'),
  body('address').optional({ values: 'falsy' }).trim(),
];

export const productValidation = [
  body('name').trim().notEmpty().withMessage('Tên sản phẩm không được để trống'),
  body('price').isFloat({ min: 0 }).withMessage('Giá phải là số không âm').toFloat(),
  body('originalPrice').optional({ values: 'falsy' }).isFloat({ min: 0 }).withMessage('Giá gốc phải là số không âm').toFloat(),
  body('categoryId').trim().notEmpty().withMessage('ID danh mục không hợp lệ'),
  body('stock').optional({ values: 'falsy' }).isInt({ min: 0 }).withMessage('Số lượng tồn kho phải là số nguyên không âm').toInt(),
  body('unit').optional({ values: 'falsy' }).trim().notEmpty().withMessage('Đơn vị không được để trống'),
  body('isFeatured').optional().isBoolean().withMessage('Trạng thái nổi bật không hợp lệ').toBoolean(),
  body('isActive').optional().isBoolean().withMessage('Trạng thái hiển thị không hợp lệ').toBoolean(),
];

export const productUpdateValidation = [
  body('name').optional().trim().notEmpty().withMessage('Tên sản phẩm không được để trống'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Giá phải là số không âm').toFloat(),
  body('originalPrice').optional({ values: 'falsy' }).isFloat({ min: 0 }).withMessage('Giá gốc phải là số không âm').toFloat(),
  body('categoryId').optional().trim().notEmpty().withMessage('ID danh mục không hợp lệ'),
  body('stock').optional({ values: 'falsy' }).isInt({ min: 0 }).withMessage('Số lượng tồn kho phải là số nguyên không âm').toInt(),
  body('unit').optional({ values: 'falsy' }).trim().notEmpty().withMessage('Đơn vị không được để trống'),
  body('isFeatured').optional().isBoolean().withMessage('Trạng thái nổi bật không hợp lệ').toBoolean(),
  body('isActive').optional().isBoolean().withMessage('Trạng thái hiển thị không hợp lệ').toBoolean(),
];

export const categoryValidation = [
  body('name').trim().notEmpty().withMessage('Tên danh mục không được để trống'),
  body('slug').optional({ values: 'falsy' }).trim().matches(/^[a-z0-9-]+$/).withMessage('Slug chỉ chứa chữ thường, số và dấu gạch ngang'),
  body('description').optional({ values: 'falsy' }).trim(),
  body('image').optional({ values: 'falsy' }).trim(),
  body('parentId').optional({ values: 'falsy' }).trim(),
  body('sortOrder').optional({ values: 'falsy' }).isInt({ min: 0 }).withMessage('Thứ tự phải là số nguyên không âm').toInt(),
  body('isActive').optional().isBoolean().withMessage('Trạng thái danh mục không hợp lệ').toBoolean(),
];

export const cartItemValidation = [
  body('productId').trim().notEmpty().withMessage('ID sản phẩm không hợp lệ'),
  body('quantity').isInt({ min: 1 }).withMessage('Số lượng phải lớn hơn 0').toInt(),
];

export const cartItemUpdateValidation = [
  body('quantity').isInt({ min: 0 }).withMessage('Số lượng phải là số nguyên không âm').toInt(),
];

export const orderValidation = [
  body('shippingName').trim().notEmpty().withMessage('Tên người nhận không được để trống'),
  body('shippingPhone').matches(/^[0-9]{10,11}$/).withMessage('Số điện thoại không hợp lệ'),
  body('shippingAddress').trim().notEmpty().withMessage('Địa chỉ giao hàng không được để trống'),
  body('paymentMethod').optional().isIn(paymentMethods).withMessage('Phương thức thanh toán không hợp lệ'),
  body('items').isArray({ min: 1 }).withMessage('Đơn hàng phải có ít nhất một sản phẩm'),
  body('items.*.productId').trim().notEmpty().withMessage('ID sản phẩm không hợp lệ'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Số lượng phải lớn hơn 0').toInt(),
];

export const orderStatusValidation = [
  body('status').isIn(orderStatuses).withMessage('Trạng thái đơn hàng không hợp lệ'),
  body('cancelReason').optional({ values: 'falsy' }).trim(),
];

export const userStatusValidation = [
  body('status').isIn(userStatuses).withMessage('Trạng thái người dùng không hợp lệ'),
];

export const settingValidation = [
  body('siteName').optional().trim().notEmpty().withMessage('Tên website không được để trống'),
  body('contactEmail').optional({ values: 'falsy' }).isEmail().withMessage('Email liên hệ không hợp lệ').normalizeEmail(),
  body('contactPhone').optional({ values: 'falsy' }).trim().isLength({ min: 8, max: 20 }).withMessage('Số điện thoại liên hệ không hợp lệ'),
  body('address').optional({ values: 'falsy' }).trim(),
  body('businessHours').optional({ values: 'falsy' }).trim(),
];

export const faqValidation = [
  body('question').trim().notEmpty().withMessage('Câu hỏi không được để trống'),
  body('answer').trim().notEmpty().withMessage('Câu trả lời không được để trống'),
  body('keywords').optional({ values: 'falsy' }).trim(),
  body('category').optional({ values: 'falsy' }).trim(),
  body('productId').optional({ values: 'falsy' }).trim(),
  body('priority').optional({ values: 'falsy' }).isInt({ min: 0 }).withMessage('Độ ưu tiên phải là số nguyên không âm').toInt(),
  body('isActive').optional().isBoolean().withMessage('Trạng thái FAQ không hợp lệ').toBoolean(),
];

export const faqUpdateValidation = [
  body('question').optional().trim().notEmpty().withMessage('Câu hỏi không được để trống'),
  body('answer').optional().trim().notEmpty().withMessage('Câu trả lời không được để trống'),
  body('keywords').optional({ values: 'falsy' }).trim(),
  body('category').optional({ values: 'falsy' }).trim(),
  body('productId').optional({ values: 'falsy' }).trim(),
  body('priority').optional({ values: 'falsy' }).isInt({ min: 0 }).withMessage('Độ ưu tiên phải là số nguyên không âm').toInt(),
  body('isActive').optional().isBoolean().withMessage('Trạng thái FAQ không hợp lệ').toBoolean(),
];

export const paginationQueryValidation = [
  query('page').optional({ values: 'falsy' }).isInt({ min: 1 }).withMessage('Page phải là số nguyên lớn hơn 0').toInt(),
  query('limit').optional({ values: 'falsy' }).isInt({ min: 1, max: 100 }).withMessage('Limit phải từ 1 đến 100').toInt(),
];

export const limitQueryValidation = [
  query('limit').optional({ values: 'falsy' }).isInt({ min: 1, max: 100 }).withMessage('Limit phải từ 1 đến 100').toInt(),
];

export const productQueryValidation = [
  ...paginationQueryValidation,
  query('search').optional({ values: 'falsy' }).trim(),
  query('categoryId').optional({ values: 'falsy' }).trim(),
  query('minPrice').optional({ values: 'falsy' }).isFloat({ min: 0 }).withMessage('Giá thấp nhất không hợp lệ').toFloat(),
  query('maxPrice')
    .optional({ values: 'falsy' })
    .isFloat({ min: 0 })
    .withMessage('Giá cao nhất không hợp lệ')
    .toFloat()
    .custom((maxPrice, { req }) => {
      const minPrice = req.query?.minPrice;
      if (minPrice !== undefined && minPrice !== '' && Number(maxPrice) < Number(minPrice)) {
        throw new Error('Giá cao nhất phải lớn hơn hoặc bằng giá thấp nhất');
      }
      return true;
    }),
  query('inStock').optional({ values: 'falsy' }).isBoolean().withMessage('Bộ lọc tồn kho không hợp lệ').toBoolean(),
  query('sortBy').optional({ values: 'falsy' }).isIn(['createdAt', 'price', 'soldCount', 'viewCount', 'rating', 'name']).withMessage('Trường sắp xếp không hợp lệ'),
  query('sortOrder').optional({ values: 'falsy' }).isIn(['asc', 'desc']).withMessage('Chiều sắp xếp không hợp lệ'),
];

export const adminProductQueryValidation = [
  ...paginationQueryValidation,
  query('search').optional({ values: 'falsy' }).trim(),
  query('categoryId').optional({ values: 'falsy' }).trim(),
  query('isActive').optional({ values: 'falsy' }).isBoolean().withMessage('Trạng thái hiển thị không hợp lệ').toBoolean(),
];

export const categoryAdminQueryValidation = [
  ...paginationQueryValidation,
  query('search').optional({ values: 'falsy' }).trim(),
];

export const faqAdminQueryValidation = [
  ...paginationQueryValidation,
  query('category').optional({ values: 'falsy' }).trim(),
  query('search').optional({ values: 'falsy' }).trim(),
];

export const userAdminQueryValidation = [
  ...paginationQueryValidation,
  query('search').optional({ values: 'falsy' }).trim(),
  query('role').optional({ values: 'falsy' }).isIn(userRoles).withMessage('Vai trò người dùng không hợp lệ'),
  query('status').optional({ values: 'falsy' }).isIn(userStatuses).withMessage('Trạng thái người dùng không hợp lệ'),
];

export const orderAdminQueryValidation = [
  ...paginationQueryValidation,
  query('status').optional({ values: 'falsy' }).isIn(orderStatuses).withMessage('Trạng thái đơn hàng không hợp lệ'),
  query('search').optional({ values: 'falsy' }).trim(),
  query('startDate').optional({ values: 'falsy' }).isISO8601({ strict: true }).withMessage('Ngày bắt đầu không hợp lệ'),
  dateRangeValidator,
];

export const dateRangeQueryValidation = [
  query('startDate').optional({ values: 'falsy' }).isISO8601({ strict: true }).withMessage('Ngày bắt đầu không hợp lệ'),
  dateRangeValidator,
];

export const idParamValidation = [
  param('id').trim().notEmpty().withMessage('ID không hợp lệ'),
];

export const chatbotValidation = [
  body('message').trim().notEmpty().withMessage('Tin nhắn không được để trống'),
];
