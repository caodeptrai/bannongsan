# 7. ERD - Entity Relationship Diagram

## 7.1 Mô hình ERD

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│      USERS      │       │     ORDERS      │       │    PAYMENTS     │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │──┐    │ id (PK)         │───────│ orderId (FK)    │
│ email           │  │    │ orderNumber     │       │ id (PK)         │
│ password        │  │    │ userId (FK)    │◀──────│ method          │
│ fullName        │  └───▶│ status          │       │ amount          │
│ phone           │       │ total           │       │ status          │
│ address         │       │ shippingFee     │       │ paidAt          │
│ role            │       │ discount        │       └─────────────────┘
│ status          │       │ shippingName    │
└────────┬────────┘       │ shippingPhone   │       ┌─────────────────┐
         │                 │ shippingAddress │       │  ORDER_ITEMS    │
         │                 │ createdAt       │──────▶├─────────────────┤
         │                 └────────┬────────┘       │ id (PK)         │
         │                          │                │ orderId (FK)    │
         │                          │                │ productId (FK)  │
         │                          │                │ productName     │
         │                          │                │ quantity        │
         │                          │                │ price           │
         │                          │                │ total           │
         │                          │                └─────────────────┘
         │                          │
         │                          ▼
         │                 ┌─────────────────┐
         │                 │      CARTS       │
         │                 ├─────────────────┤
         │                 │ id (PK)         │
         │                 │ userId (FK)     │◀───┐
         │                 │ sessionId       │    │
         │                 │ createdAt       │    │
         │                 └────────┬────────┘    │
         │                          │              │
         │                          ▼              │
         │                 ┌─────────────────┐      │
         └────────────────▶│   CART_ITEMS    │      │
                           ├─────────────────┤      │
                           │ id (PK)         │      │
                           │ cartId (FK)     │──────┘
                           │ productId (FK)──┼──────────────────┐
                           │ quantity        │                  │
                           └─────────────────┘                  │
                                                                 │
┌─────────────────┐       ┌─────────────────┐                   │
│   CATEGORIES    │       │    PRODUCTS     │◀──────────────────┘
├─────────────────┤       ├─────────────────┤
│ id (PK)         │◀──┐   │ id (PK)         │
│ name            │   │   │ name            │
│ slug            │   │   │ slug            │
│ description     │   │   │ description     │
│ parentId (FK)───┼───┘   │ price           │
│ isActive        │       │ categoryId (FK) │
│ sortOrder       │       │ stock           │
└─────────────────┘       │ isFeatured      │
                         │ isActive        │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ PRODUCT_IMAGES  │
                         ├─────────────────┤
                         │ id (PK)         │
                         │ productId (FK)  │
                         │ url             │
                         │ isPrimary       │
                         │ sortOrder       │
                         └─────────────────┘

┌─────────────────┐
│   REVIEWS       │
├─────────────────┤
│ id (PK)         │
│ userId (FK)─────┼─────────────────┐
│ productId (FK)──┼─────────────────┼─┐
│ rating          │                 │ │
│ comment         │                 │ │
│ createdAt       │                 │ │
└─────────────────┘                 │ │
                                    │ │
┌─────────────────┐                 │ │
│  CHATBOT_FAQS   │                 │ │
├─────────────────┤                 │ │
│ id (PK)         │                 │ │
│ question        │                 │ │
│ answer          │                 │ │
│ keywords        │                 │ │
│ category        │                 │ │
│ productId (FK)──┼─────────────────┘ │
│ isActive        │                   │
│ priority        │                   │
└─────────────────┘                   │
                                    │
┌─────────────────┐                 │
│     USERS       │◀────────────────┘
├─────────────────┤
│ (đã định nghĩa ở trên)
└─────────────────┘
```

## 7.2 Mô tả các thực thể

### Users
| Thuộc tính | Kiểu | Mô tả |
|-----------|------|--------|
| id | UUID | Khóa chính |
| email | String | Email đăng nhập (unique) |
| password | String | Mật khẩu đã mã hóa |
| fullName | String | Họ tên đầy đủ |
| phone | String? | Số điện thoại |
| address | String? | Địa chỉ |
| avatar | String? | URL ảnh đại diện |
| role | Enum | ADMIN, USER |
| status | Enum | ACTIVE, INACTIVE, LOCKED |

### Categories
| Thuộc tính | Kiểu | Mô tả |
|-----------|------|--------|
| id | UUID | Khóa chính |
| name | String | Tên danh mục |
| slug | String | Slug URL (unique) |
| description | String? | Mô tả |
| image | String? | URL hình ảnh |
| parentId | UUID? | ID danh mục cha (self-ref) |
| isActive | Boolean | Trạng thái hoạt động |
| sortOrder | Int | Thứ tự hiển thị |

### Products
| Thuộc tính | Kiểu | Mô tả |
|-----------|------|--------|
| id | UUID | Khóa chính |
| name | String | Tên sản phẩm |
| slug | String | Slug URL (unique) |
| description | String? | Mô tả chi tiết |
| price | Decimal | Giá bán |
| originalPrice | Decimal? | Giá gốc (nếu giảm giá) |
| unit | String | Đơn vị tính (kg, cái,...) |
| stock | Int | Số lượng tồn kho |
| sku | String? | Mã SKU |
| categoryId | UUID | FK → Categories |
| isFeatured | Boolean | Sản phẩm nổi bật |
| isActive | Boolean | Trạng thái hoạt động |

### Orders
| Thuộc tính | Kiểu | Mô tả |
|-----------|------|--------|
| id | UUID | Khóa chính |
| orderNumber | String | Mã đơn hàng (unique) |
| userId | UUID | FK → Users |
| status | Enum | PENDING, CONFIRMED, SHIPPING, COMPLETED, CANCELLED |
| subtotal | Decimal | Tổng tiền hàng |
| shippingFee | Decimal | Phí vận chuyển |
| discount | Decimal | Giảm giá |
| total | Decimal | Tổng cộng |
| shippingName | String | Tên người nhận |
| shippingPhone | String | SĐT người nhận |
| shippingAddress | String | Địa chỉ giao hàng |
| paymentMethod | Enum | COD, BANK_TRANSFER, MOMO, ZALOPAY |
| paymentStatus | Enum | PENDING, PAID, FAILED, REFUNDED |

## 7.3 Quan hệ giữa các bảng

| Bảng cha | Bảng con | Loại quan hệ |
|---------|---------|-------------|
| Users | Orders | 1:N |
| Users | Carts | 1:1 |
| Users | Reviews | 1:N |
| Categories | Products | 1:N |
| Products | ProductImages | 1:N |
| Products | CartItems | 1:N |
| Products | OrderItems | 1:N |
| Products | Reviews | 1:N |
| Products | ChatbotFAQs | 1:N |
| Orders | OrderItems | 1:N |
| Orders | Payments | 1:1 |
| Carts | CartItems | 1:N |
| Categories | Categories | 1:N (self-ref) |
