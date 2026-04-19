# 10. Test Cases

## 10.1 Unit Tests

### 10.1.1 Authentication Tests

| Test ID | Mô tả | Input | Expected Result |
|---------|--------|-------|----------------|
| AUTH-001 | Đăng ký thành công | email, password, fullName hợp lệ | User được tạo, token được trả về |
| AUTH-002 | Đăng ký với email trùng | Email đã tồn tại | Error: Email đã được đăng ký |
| AUTH-003 | Đăng nhập thành công | email/password đúng | Login thành công, token được trả về |
| AUTH-004 | Đăng nhập sai mật khẩu | Password sai | Error: Email hoặc mật khẩu không đúng |
| AUTH-005 | Đăng nhập với tài khoản bị khóa | Status = LOCKED | Error: Tài khoản đã bị khóa |
| AUTH-006 | Token hết hạn | Token expired | Error: Token đã hết hạn |

### 10.1.2 Product Tests

| Test ID | Mô tả | Input | Expected Result |
|---------|--------|-------|----------------|
| PROD-001 | Lấy danh sách sản phẩm | - | Trả về danh sách sản phẩm với phân trang |
| PROD-002 | Tìm kiếm sản phẩm | search="xoai" | Chỉ trả về sản phẩm có tên chứa "xoai" |
| PROD-003 | Lọc theo danh mục | categoryId hợp lệ | Chỉ trả về sản phẩm thuộc danh mục đó |
| PROD-004 | Lọc theo khoảng giá | minPrice=50000, maxPrice=100000 | Sản phẩm trong khoảng giá |
| PROD-005 | Xem chi tiết sản phẩm | productId hợp lệ | Trả về thông tin đầy đủ + tăng viewCount |
| PROD-006 | Sản phẩm không tồn tại | productId không tồn tại | Error: Không tìm thấy sản phẩm |

### 10.1.3 Cart Tests

| Test ID | Mô tả | Input | Expected Result |
|---------|--------|-------|----------------|
| CART-001 | Thêm sản phẩm vào giỏ | productId, quantity | CartItem được tạo |
| CART-002 | Thêm sản phẩm đã có trong giỏ | productId đã tồn tại | Tăng số lượng |
| CART-003 | Thêm vượt số lượng tồn kho | quantity > stock | Error: Số lượng vượt quá tồn kho |
| CART-004 | Cập nhật số lượng hợp lệ | quantity mới hợp lệ | CartItem được cập nhật |
| CART-005 | Xóa sản phẩm khỏi giỏ | cartItemId | CartItem được xóa |
| CART-006 | Tính tổng tiền giỏ hàng | Cart có nhiều items | Tổng đúng với công thức |

### 10.1.4 Order Tests

| Test ID | Mô tả | Input | Expected Result |
|---------|--------|-------|----------------|
| ORD-001 | Tạo đơn hàng thành công | Thông tin đầy đủ, đủ tồn kho | Order được tạo, stock được trừ |
| ORD-002 | Tạo đơn với sản phẩm hết hàng | Một sản phẩm stock=0 | Error: Sản phẩm không đủ |
| ORD-003 | Tạo đơn với tổng ≥ 500k | subtotal ≥ 500000 | shippingFee = 0 |
| ORD-004 | Tạo đơn với tổng < 200k | subtotal < 200000 | shippingFee = 25000 |
| ORD-005 | Tạo đơn với tổng ≥ 200k và < 500k | 200k ≤ subtotal < 500k | shippingFee = 15000 |
| ORD-006 | Hủy đơn PENDING | Order status = PENDING | Stock được hoàn, status = CANCELLED |
| ORD-007 | Hủy đơn CONFIRMED | Order status = CONFIRMED | Error: Không thể hủy |

### 10.1.5 Admin Tests

| Test ID | Mô tả | Input | Expected Result |
|---------|--------|-------|----------------|
| ADMIN-001 | Cập nhật trạng thái PENDING → CONFIRMED | Valid orderId | confirmedAt được set |
| ADMIN-002 | Cập nhật trạng thái CONFIRMED → SHIPPING | Valid orderId | shippedAt được set |
| ADMIN-003 | Cập nhật trạng thái → COMPLETED | Valid orderId | completedAt set, paymentStatus = PAID |
| ADMIN-004 | Khóa tài khoản user | userId, status=LOCKED | User status = LOCKED |
| ADMIN-005 | Thêm sản phẩm mới | Valid product data | Product được tạo |
| ADMIN-006 | Xóa sản phẩm có đơn hàng | Product có orderItems | Product isActive = false |

### 10.1.6 Chatbot Tests

| Test ID | Mô tả | Input | Expected Result |
|---------|--------|-------|----------------|
| CHAT-001 | Hỏi về sản phẩm cụ thể | "Còn bưởi da xanh không?" | Trả lời có thông tin bưởi |
| CHAT-002 | Hỏi về giờ mở cửa | "Mấy giờ mở cửa?" | Trả lời: 7h00 - 21h00 |
| CHAT-003 | Hỏi về sản phẩm không có trong DB | "abcxyz" | Trả lời fallback |
| CHAT-004 | Tìm theo keyword | "giá" + "cherry" | Trả lời giá cherry |

## 10.2 Integration Tests

### 10.2.1 E2E User Flow

| Test ID | Mô tả | Steps | Expected |
|---------|--------|-------|----------|
| E2E-001 | Mua hàng hoàn chỉnh | 1. Login → 2. Xem sản phẩm → 3. Thêm giỏ → 4. Checkout → 5. Đặt hàng | Đơn hàng được tạo với status PENDING |
| E2E-002 | Checkout với giảm giá | 1. Login → 2. Thêm sản phẩm ≥ 500k → 3. Checkout | shippingFee = 0, discount = 5% |
| E2E-003 | Admin xử lý đơn hàng | 1. Login admin → 2. Vào orders → 3. Update status → COMPLETED | Order completed, stock soldCount tăng |

## 10.3 Test Environment Setup

```bash
# Backend
cd backend
npm run prisma:seed
npm test

# Frontend
cd frontend-angular
npm test
```

## 10.4 Test Accounts

| Role | Email | Password | Purpose |
|------|-------|----------|---------|
| Admin | admin@example.com | 123456 | Test admin features |
| User | user1@example.com | 123456 | Test customer features |
| User | user2@example.com | 123456 | Test customer features |

## 10.5 Manual Test Checklist

### Customer Flow
- [ ] Đăng ký tài khoản mới
- [ ] Đăng nhập với tài khoản mới
- [ ] Xem danh sách sản phẩm
- [ ] Tìm kiếm sản phẩm
- [ ] Lọc sản phẩm theo danh mục
- [ ] Xem chi tiết sản phẩm
- [ ] Thêm sản phẩm vào giỏ hàng
- [ ] Cập nhật số lượng trong giỏ
- [ ] Xóa sản phẩm khỏi giỏ
- [ ] Tiến hành đặt hàng
- [ ] Xem lịch sử đơn hàng
- [ ] Xem chi tiết đơn hàng
- [ ] Hủy đơn hàng (nếu PENDING)
- [ ] Sử dụng chatbot
- [ ] Cập nhật hồ sơ cá nhân

### Admin Flow
- [ ] Đăng nhập admin
- [ ] Xem dashboard
- [ ] Quản lý danh mục (CRUD)
- [ ] Quản lý sản phẩm (CRUD)
- [ ] Cập nhật tồn kho
- [ ] Xem danh sách đơn hàng
- [ ] Lọc đơn hàng theo trạng thái
- [ ] Cập nhật trạng thái đơn hàng
- [ ] Xem chi tiết đơn hàng
- [ ] Quản lý khách hàng
- [ ] Khóa/mở tài khoản
- [ ] Xem thống kê doanh thu
- [ ] Xem top sản phẩm bán chạy
