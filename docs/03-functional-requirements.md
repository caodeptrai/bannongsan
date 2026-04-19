# 3. Yêu cầu chức năng

## 3.1 Module Khách hàng (Customer)

### 3.1.1 Xem sản phẩm
- **UC-001**: Xem danh sách sản phẩm
  - Actor: Khách hàng
  - Mô tả: Hiển thị danh sách sản phẩm với phân trang
  - Input: Tham số lọc (danh mục, giá, từ khóa)
  - Output: Danh sách sản phẩm với hình ảnh, giá, mô tả ngắn

- **UC-002**: Xem chi tiết sản phẩm
  - Actor: Khách hàng
  - Mô tả: Hiển thị thông tin đầy đủ về sản phẩm
  - Input: ID/Slug sản phẩm
  - Output: Tên, giá, mô tả, hình ảnh, đánh giá, sản phẩm liên quan

- **UC-003**: Tìm kiếm sản phẩm
  - Actor: Khách hàng
  - Mô tả: Tìm kiếm theo tên, mô tả sản phẩm
  - Input: Từ khóa tìm kiếm
  - Output: Danh sách sản phẩm phù hợp

- **UC-004**: Lọc sản phẩm
  - Actor: Khách hàng
  - Mô tả: Lọc theo danh mục, khoảng giá, tình trạng
  - Input: Bộ lọc (categoryId, minPrice, maxPrice, inStock)
  - Output: Danh sách sản phẩm đã lọc

### 3.1.2 Giỏ hàng
- **UC-005**: Thêm vào giỏ hàng
  - Actor: Khách hàng
  - Mô tả: Thêm sản phẩm vào giỏ hàng
  - Input: productId, quantity
  - Output: Cập nhật giỏ hàng

- **UC-006**: Cập nhật số lượng
  - Actor: Khách hàng
  - Mô tả: Tăng/giảm số lượng sản phẩm trong giỏ
  - Input: cartItemId, quantity
  - Output: Cập nhật số lượng, tính lại tổng

- **UC-007**: Xóa sản phẩm khỏi giỏ
  - Actor: Khách hàng
  - Mô tả: Xóa một sản phẩm khỏi giỏ hàng
  - Input: cartItemId
  - Output: Giỏ hàng đã cập nhật

### 3.1.3 Đặt hàng
- **UC-008**: Tạo đơn hàng
  - Actor: Khách hàng (đã đăng nhập)
  - Mô tả: Tạo đơn hàng từ giỏ hàng
  - Input: Thông tin giao hàng, phương thức thanh toán
  - Output: OrderNumber, trạng thái PENDING

- **UC-009**: Xem lịch sử đơn hàng
  - Actor: Khách hàng (đã đăng nhập)
  - Mô tả: Xem danh sách đơn hàng đã đặt
  - Output: Danh sách đơn hàng với trạng thái

- **UC-010**: Xem chi tiết đơn hàng
  - Actor: Khách hàng
  - Mô tả: Xem thông tin chi tiết một đơn hàng
  - Input: orderId
  - Output: Thông tin đơn hàng đầy đủ

- **UC-011**: Hủy đơn hàng
  - Actor: Khách hàng
  - Mô tả: Hủy đơn hàng đang chờ xác nhận
  - Input: orderId, lý do hủy
  - Output: Trạng thái CANCELLED, hoàn lại tồn kho

### 3.1.4 Tài khoản
- **UC-012**: Đăng ký tài khoản
  - Actor: Khách hàng mới
  - Mô tả: Tạo tài khoản mới
  - Input: email, password, fullName, phone
  - Output: Tài khoản được tạo, token đăng nhập

- **UC-013**: Đăng nhập
  - Actor: Khách hàng đã có tài khoản
  - Mô tả: Đăng nhập vào hệ thống
  - Input: email, password
  - Output: JWT Token, thông tin người dùng

- **UC-014**: Cập nhật hồ sơ
  - Actor: Khách hàng
  - Mô tả: Thay đổi thông tin cá nhân
  - Input: fullName, phone, address
  - Output: Thông tin đã cập nhật

### 3.1.5 Chatbot
- **UC-015**: Hỏi chatbot
  - Actor: Khách hàng
  - Mô tả: Gửi tin nhắn hỏi đáp với chatbot
  - Input: message
  - Output: Câu trả lời phù hợp

## 3.2 Module Quản trị (Admin)

### 3.2.1 Dashboard
- **UC-016**: Xem dashboard tổng quan
  - Actor: Admin
  - Mô tả: Hiển thị thống kê tổng quan
  - Output: Tổng users, products, orders, revenue

### 3.2.2 Quản lý danh mục
- **UC-017**: Thêm danh mục
  - Actor: Admin
  - Input: name, slug, description, image
  - Output: Danh mục mới được tạo

- **UC-018**: Sửa danh mục
  - Actor: Admin
  - Input: categoryId, thông tin cần sửa
  - Output: Danh mục được cập nhật

- **UC-019**: Xóa danh mục
  - Actor: Admin
  - Input: categoryId
  - Output: Danh mục bị xóa (nếu không có sản phẩm)

### 3.2.3 Quản lý sản phẩm
- **UC-020**: Thêm sản phẩm
  - Actor: Admin
  - Input: name, price, categoryId, stock, images, description
  - Output: Sản phẩm mới

- **UC-021**: Sửa sản phẩm
  - Actor: Admin
  - Input: productId, thông tin cần sửa
  - Output: Sản phẩm được cập nhật

- **UC-022**: Xóa sản phẩm
  - Actor: Admin
  - Input: productId
  - Output: Sản phẩm bị xóa hoặc vô hiệu hóa

### 3.2.4 Quản lý đơn hàng
- **UC-023**: Xem danh sách đơn hàng
  - Actor: Admin
  - Mô tả: Xem tất cả đơn hàng với bộ lọc
  - Input: status, date range, search
  - Output: Danh sách đơn hàng

- **UC-024**: Cập nhật trạng thái đơn hàng
  - Actor: Admin
  - Input: orderId, newStatus
  - Output: Trạng thái được cập nhật

### 3.2.5 Quản lý khách hàng
- **UC-025**: Xem danh sách khách hàng
  - Actor: Admin
  - Output: Danh sách người dùng

- **UC-026**: Khóa/mở tài khoản
  - Actor: Admin
  - Input: userId, newStatus
  - Output: Trạng thái tài khoản thay đổi

### 3.2.6 Thống kê
- **UC-027**: Xem thống kê doanh thu
  - Actor: Admin
  - Input: date range
  - Output: Total revenue, orders, top products, charts
