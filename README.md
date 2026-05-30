# WebBanHoaQua - Website Bán Nông Sản

> Hệ thống thương mại điện tử bán nông sản tươi ngon, chất lượng cao với đầy đủ chức năng cho khách hàng và quản trị viên.

## 1. Giới thiệu

**WebBanHoaQua** là dự án đồ án tốt nghiệp được xây dựng theo mô hình **web client-server** với:

- Website bán hàng trực tuyến cho khách hàng
- Hệ thống quản trị cho admin
- Chatbot hỗ trợ tư vấn sản phẩm
- Dashboard thống kê doanh thu

## 2. Công nghệ sử dụng

| Phần | Công nghệ | Phiên bản |
|-------|------------|-----------|
| Frontend | Angular | 17.x |
| Ngôn ngữ | TypeScript | 5.x |
| Backend | Node.js + Express | 18.x / 4.x |
| Database | MySQL | 8.x |
| ORM | Prisma | 5.x |
| Auth | JWT | - |
| UI | SCSS | - |

## 3. Tính năng chính

### 3.1 Phía Khách hàng
- [x] Xem danh sách sản phẩm nông sản
- [x] Tìm kiếm và lọc sản phẩm theo danh mục, giá
- [x] Xem chi tiết sản phẩm với hình ảnh, mô tả
- [x] Đăng ký / Đăng nhập tài khoản
- [x] Quản lý giỏ hàng (thêm, sửa, xóa)
- [x] Đặt hàng trực tuyến với thanh toán COD
- [x] Xem lịch sử và trạng thái đơn hàng
- [x] Chatbot tư vấn sản phẩm 24/7

### 3.2 Phía Quản trị viên
- [x] Dashboard tổng quan với thống kê
- [x] Quản lý danh mục sản phẩm (CRUD)
- [x] Quản lý sản phẩm (CRUD, tồn kho, giá)
- [x] Quản lý khách hàng (xem, khóa/mở tài khoản)
- [x] Quản lý đơn hàng (xác nhận, cập nhật trạng thái)
- [x] Thống kê doanh thu theo ngày/tháng

## 4. Cấu trúc dự án

```
webbanhoaqua/
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── configs/           # Cấu hình ứng dụng
│   │   ├── controllers/      # Xử lý HTTP requests
│   │   ├── services/          # Logic nghiệp vụ
│   │   ├── routes/            # Định nghĩa API routes
│   │   ├── middlewares/      # JWT, Upload, Error Handler
│   │   ├── validators/        # Validation rules
│   │   ├── types/            # TypeScript types
│   │   ├── utils/            # Helper functions
│   │   └── index.ts           # Entry point
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── seed.ts           # Seed data
│   └── package.json
│
├── frontend-angular/          # Angular 17 Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/         # Services, Guards, Interceptors
│   │   │   ├── shared/       # Header, Footer, ProductCard, Chatbot
│   │   │   ├── layouts/      # Client & Admin layouts
│   │   │   └── features/     # Pages & Admin modules
│   │   ├── environments/     # Environment configs
│   │   └── styles.scss       # Global styles
│   └── package.json
│
├── docs/                       # Tài liệu đồ án
│   ├── 01-overview.md
│   ├── 02-business-process.md
│   ├── 03-functional-requirements.md
│   ├── 04-non-functional-requirements.md
│   ├── 05-use-case-list.md
│   ├── 06-use-case-specifications.md
│   ├── 07-erd.md
│   ├── 08-system-architecture.md
│   ├── 09-api-specification.md
│   ├── 10-test-cases.md
│   ├── 11-deployment-guide.md
│   └── 12-demo-script.md
│
└── README.md
```

## 5. Cài đặt

### 5.1 Yêu cầu hệ thống

- **Node.js**: v18.x hoặc cao hơn
- **MySQL**: 8.0 hoặc cao hơn
- **npm**: v8.x hoặc cao hơn

### 5.2 Cài đặt Backend

```bash
cd backend

# Cài đặt dependencies
npm install

# Cấu hình database trong .env
# DATABASE_URL="mysql://root:@localhost:3306/webbanhoaqua"

# Generate Prisma Client
npm run prisma:generate

# Tạo database tables
npm run prisma:push

# Seed dữ liệu mẫu
npm run prisma:seed

# Chạy development server
npm run dev
```

Backend sẽ chạy tại: `http://localhost:5000`

### 5.3 Cài đặt Frontend

```bash
cd frontend-angular

# Cài đặt dependencies
npm install

# Chạy development server
npm start
```

Frontend sẽ chạy tại: `http://localhost:4200`

### 5.4 Cấu hình MySQL

Tạo database trước khi chạy:

```sql
CREATE DATABASE webbanhoaqua CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Nếu MySQL có password, chỉnh sửa file `backend/.env`:

```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/webbanhoaqua"
```

### 5.5 Cấu hình OpenRouter cho chatbot

Chatbot gọi OpenRouter Chat Completions và dùng dữ liệu đang có trên website
(danh mục, sản phẩm đang bán, FAQ và chính sách cửa hàng) làm ngữ cảnh trả lời.

Thêm các biến sau vào `backend/.env`:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openai/gpt-4o-mini
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_SITE_URL=http://localhost:4200
OPENROUTER_APP_NAME=WebBanHoaQua
```

## 6. Tài khoản Demo

### Admin Account
| Email | Password | Quyền |
|-------|----------|--------|
| admin@example.com | 123456 | Full access |

### Customer Accounts
| Email | Password | Ghi chú |
|-------|----------|---------|
| user1@example.com | 123456 | Tài khoản khách hàng 1 |
| user2@example.com | 123456 | Tài khoản khách hàng 2 |

Có **15 customer accounts** được seed từ user1 đến user15@example.com với password: `123456`

## 7. Các lệnh quan trọng

### Backend
```bash
# Chạy development
npm run dev

# Build production
npm run build
npm start

# Database
npm run prisma:generate   # Generate client
npm run prisma:push       # Push schema
npm run prisma:migrate    # Create migrations
npm run prisma:seed       # Seed data
npm run prisma:studio     # Open Prisma Studio
```

### Frontend
```bash
# Chạy development
npm start

# Build production
npm run build

# Watch mode
npm run watch
```

## 8. API Endpoints chính

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| POST | /api/auth/register | Đăng ký |
| POST | /api/auth/login | Đăng nhập |
| GET | /api/products | Danh sách sản phẩm |
| GET | /api/products/:slug | Chi tiết sản phẩm |
| GET | /api/categories | Danh mục |
| POST | /api/cart/items | Thêm vào giỏ |
| POST | /api/orders | Tạo đơn hàng |
| GET | /api/orders/my | Đơn hàng của tôi |
| POST | /api/chatbot/message | Gửi tin nhắn chatbot |
| GET | /api/admin/statistics/revenue | Thống kê doanh thu |

## 9. Database Schema

Các bảng chính:

- **users** - Người dùng (khách hàng, admin)
- **categories** - Danh mục sản phẩm
- **products** - Sản phẩm
- **product_images** - Hình ảnh sản phẩm
- **orders** - Đơn hàng
- **order_items** - Chi tiết đơn hàng
- **payments** - Thanh toán
- **carts** - Giỏ hàng
- **cart_items** - Sản phẩm trong giỏ
- **reviews** - Đánh giá sản phẩm
- **chatbot_faqs** - Câu hỏi chatbot

Xem chi tiết trong `docs/07-erd.md`

## 10. Trạng thái đơn hàng

```
PENDING → CONFIRMED → SHIPPING → COMPLETED
   ↓
CANCELLED
```

- **PENDING**: Chờ xác nhận
- **CONFIRMED**: Đã xác nhận
- **SHIPPING**: Đang giao hàng
- **COMPLETED**: Hoàn thành
- **CANCELLED**: Đã hủy

## 11. Quy định giao hàng

| Đơn hàng | Phí giao |
|-----------|----------|
| < 200.000đ | 25.000đ |
| 200.000đ - 500.000đ | 15.000đ |
| ≥ 500.000đ | **Miễn phí** |

## 12. Troubleshooting

### Lỗi kết nối MySQL
1. Kiểm tra MySQL đang chạy
2. Kiểm tra DATABASE_URL trong `.env`
3. Tạo database: `CREATE DATABASE webbanhoaqua;`

### Lỗi Prisma Client
```bash
npm run prisma:generate
```

### Reset Database
```bash
cd backend
npx prisma migrate reset
npm run prisma:seed
```

## 13. Tài liệu tham khảo

- [Angular Documentation](https://angular.io/docs)
- [Express.js](https://expressjs.com/)
- [Prisma Documentation](https://prisma.io/docs)
- [Node.js](https://nodejs.org/docs/)

## 14. Giấy phép

Dự án được phát triển cho mục đích học tập và đồ án tốt nghiệp.

---

**Đồ án tốt nghiệp - Công nghệ Web - 2026**
