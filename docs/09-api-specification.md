# 9. API Specification

## 9.1 Authentication API

### POST /api/auth/register
**Description**: Đăng ký tài khoản mới

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "123456",
  "fullName": "Nguyễn Văn A",
  "phone": "0901234567"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Đăng ký tài khoản thành công",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "fullName": "Nguyễn Văn A",
      "role": "USER",
      "status": "ACTIVE"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### POST /api/auth/login
**Description**: Đăng nhập

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### GET /api/auth/profile
**Description**: Lấy thông tin profile người dùng

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "Nguyễn Văn A",
    "phone": "0901234567",
    "address": "123 Đường ABC, Quận 1, TP.HCM",
    "role": "USER",
    "status": "ACTIVE",
    "createdAt": "2026-04-12T00:00:00Z"
  }
}
```

### PUT /api/auth/profile
**Description**: Cập nhật thông tin cá nhân

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "fullName": "Nguyễn Văn B",
  "phone": "0909876543",
  "address": "456 Đường XYZ, Quận 2, TP.HCM"
}
```

## 9.2 Products API

### GET /api/products
**Description**: Lấy danh sách sản phẩm

**Query Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| page | int | Số trang (default: 1) |
| limit | int | Số sản phẩm/trang (default: 12) |
| search | string | Từ khóa tìm kiếm |
| categoryId | UUID | Lọc theo danh mục |
| minPrice | float | Giá tối thiểu |
| maxPrice | float | Giá tối đa |
| inStock | boolean | Chỉ hiển thị còn hàng |
| sortBy | string | Trường sắp xếp (price, soldCount, rating) |
| sortOrder | string | asc hoặc desc |

**Response** (200):
```json
{
  "success": true,
  "products": [
    {
      "id": "uuid",
      "name": "Xoài Cát Hòa Lộc",
      "slug": "xoai-cat-hoa-loc",
      "price": 65000,
      "originalPrice": 75000,
      "unit": "kg",
      "stock": 150,
      "isFeatured": true,
      "rating": 4.8,
      "reviewCount": 45,
      "category": { "id": "uuid", "name": "Trái Cây Tươi" },
      "images": [{ "url": "https://...", "isPrimary": true }]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 50,
    "totalPages": 5
  }
}
```

### GET /api/products/:id
**Description**: Lấy chi tiết sản phẩm

### GET /api/products/slug/:slug
**Description**: Lấy sản phẩm theo slug

### GET /api/products/featured
**Description**: Lấy sản phẩm nổi bật

### GET /api/products/new-arrivals
**Description**: Lấy sản phẩm mới nhất

### GET /api/products/best-sellers
**Description**: Lấy sản phẩm bán chạy

### POST /api/products (Admin)
**Description**: Tạo sản phẩm mới

### PUT /api/products/:id (Admin)
**Description**: Cập nhật sản phẩm

### DELETE /api/products/:id (Admin)
**Description**: Xóa sản phẩm

## 9.3 Categories API

### GET /api/categories
**Description**: Lấy danh sách danh mục (public)

### GET /api/categories/:id
**Description**: Lấy chi tiết danh mục

### POST /api/categories (Admin)
### PUT /api/categories/:id (Admin)
### DELETE /api/categories/:id (Admin)

## 9.4 Cart API

### GET /api/cart
**Description**: Lấy giỏ hàng hiện tại

### POST /api/cart/items
**Description**: Thêm sản phẩm vào giỏ

**Request Body**:
```json
{
  "productId": "uuid",
  "quantity": 2
}
```

### PUT /api/cart/items/:id
**Description**: Cập nhật số lượng

### DELETE /api/cart/items/:id
**Description**: Xóa sản phẩm khỏi giỏ

### DELETE /api/cart/clear
**Description**: Xóa toàn bộ giỏ hàng

## 9.5 Orders API

### POST /api/orders
**Description**: Tạo đơn hàng mới

**Request Body**:
```json
{
  "shippingName": "Nguyễn Văn A",
  "shippingPhone": "0901234567",
  "shippingAddress": "123 Đường ABC, Quận 1, TP.HCM",
  "shippingNote": "Giao giờ hành chính",
  "paymentMethod": "COD",
  "items": [
    { "productId": "uuid", "quantity": 2 }
  ]
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Đặt hàng thành công",
  "data": {
    "id": "uuid",
    "orderNumber": "ORDABC123",
    "status": "PENDING",
    "total": 135000,
    ...
  }
}
```

### GET /api/orders/my
**Description**: Lấy danh sách đơn hàng của tôi

### GET /api/orders/my/:id
**Description**: Lấy chi tiết đơn hàng

### PUT /api/orders/my/:id/cancel
**Description**: Hủy đơn hàng

### GET /api/orders/admin/all (Admin)
**Description**: Lấy tất cả đơn hàng (Admin)

### PUT /api/orders/admin/:id/status (Admin)
**Description**: Cập nhật trạng thái đơn hàng

**Request Body**:
```json
{
  "status": "CONFIRMED"
}
```

### GET /api/orders/admin/statistics/revenue (Admin)
**Description**: Thống kê doanh thu

## 9.6 Chatbot API

### POST /api/chatbot/message
**Description**: Gửi tin nhắn cho chatbot

**Request Body**:
```json
{
  "message": "Còn bưởi da xanh không?"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "response": "Còn! Bưởi Da Xanh đang có giá...",
    "category": "product",
    "confidence": "high"
  }
}
```

## 9.7 Users API (Admin)

### GET /api/users/admin/all (Admin)
### GET /api/users/admin/:id (Admin)
### PUT /api/users/admin/:id/status (Admin)
### GET /api/users/admin/stats/dashboard (Admin)

## 9.8 Error Responses

```json
{
  "success": false,
  "message": "Mô tả lỗi",
  "error": { ... }
}
```

**Status Codes**:
| Code | Mô tả |
|------|--------|
| 200 | Thành công |
| 201 | Tạo mới thành công |
| 400 | Bad Request - Dữ liệu không hợp lệ |
| 401 | Unauthorized - Chưa đăng nhập |
| 403 | Forbidden - Không có quyền |
| 404 | Not Found - Không tìm thấy |
| 500 | Internal Server Error - Lỗi server |
