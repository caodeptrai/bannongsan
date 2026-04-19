# 6. Chi tiết Use Case Specifications

## UC-001: Đăng ký tài khoản

**Mô tả**: Cho phép khách hàng tạo tài khoản mới để có thể mua hàng.

**Actor**: Khách hàng

**Pre-conditions**: Khách hàng chưa có tài khoản

**Flow chính**:
1. Khách hàng truy cập trang đăng ký
2. Nhập thông tin: email, mật khẩu, họ tên, số điện thoại
3. Click nút "Đăng ký"
4. Hệ thống kiểm tra email chưa tồn tại
5. Hệ thống mã hóa mật khẩu và lưu vào database
6. Hệ thống tạo JWT token
7. Chuyển hướng về trang chủ với tài khoản đã đăng nhập

**Flow phụ**:
- Email đã tồn tại → Hiển thị thông báo lỗi
- Dữ liệu không hợp lệ → Hiển thị validation errors

**Post-conditions**: Tài khoản được tạo, khách hàng đăng nhập tự động

---

## UC-002: Đăng nhập

**Mô tả**: Cho phép người dùng đăng nhập vào hệ thống

**Actor**: Khách hàng, Admin

**Pre-conditions**: Người dùng có tài khoản hợp lệ

**Flow chính**:
1. Người dùng nhập email và mật khẩu
2. Click nút "Đăng nhập"
3. Hệ thống kiểm tra thông tin
4. So sánh mật khẩu (bcrypt)
5. Tạo JWT token
6. Lưu token vào localStorage
7. Chuyển hướng theo role (Admin → Dashboard, User → Home)

**Flow phụ**:
- Sai mật khẩu → Thông báo lỗi
- Tài khoản bị khóa → Thông báo tài khoản bị khóa
- Tài khoản không tồn tại → Thông báo lỗi

**Post-conditions**: Người dùng đăng nhập thành công

---

## UC-005: Thêm vào giỏ hàng

**Mô tả**: Cho phép khách hàng thêm sản phẩm vào giỏ hàng

**Actor**: Khách hàng

**Pre-conditions**: Khách hàng đã đăng nhập hoặc có session

**Flow chính**:
1. Khách hàng chọn sản phẩm và số lượng
2. Click nút "Thêm vào giỏ hàng"
3. Hệ thống kiểm tra sản phẩm còn hàng
4. Kiểm tra sản phẩm đã có trong giỏ chưa
   - Nếu có → Tăng số lượng
   - Nếu chưa → Tạo cartItem mới
5. Cập nhật giỏ hàng
6. Hiển thị thông báo thành công

**Flow phụ**:
- Sản phẩm hết hàng → Thông báo không thể thêm
- Số lượng vượt tồn kho → Thông báo

**Post-conditions**: Giỏ hàng được cập nhật với sản phẩm mới

---

## UC-010: Đặt hàng

**Mô tả**: Tạo đơn hàng từ giỏ hàng

**Actor**: Khách hàng (đã đăng nhập)

**Pre-conditions**: Khách hàng có sản phẩm trong giỏ hàng

**Flow chính**:
1. Khách hàng xem giỏ hàng và click "Tiến hành đặt hàng"
2. Nhập thông tin giao hàng (hoặc dùng thông tin đã lưu)
3. Chọn phương thức thanh toán (COD/chuyển khoản)
4. Xem lại đơn hàng và tổng tiền
5. Click "Đặt hàng"
6. Hệ thống tạo order với status PENDING
7. Tạo payment record
8. Trừ tồn kho sản phẩm
9. Xóa giỏ hàng
10. Hiển thị thông báo thành công với mã đơn hàng

**Flow phąi**:
- Giỏ hàng trống → Không thể đặt hàng
- Thông tin giao hàng không hợp lệ → Validation errors
- Số lượng vượt tồn kho → Thông báo lỗi

**Post-conditions**:
- Order được tạo với trạng thái PENDING
- Giỏ hàng được xóa
- Email xác nhận được gửi (nếu có)

---

## UC-019: Cập nhật trạng thái đơn hàng

**Mô tả**: Admin cập nhật trạng thái đơn hàng

**Actor**: Admin

**Pre-conditions**: Admin đã đăng nhập, đơn hàng tồn tại

**Flow chính**:
1. Admin xem danh sách đơn hàng
2. Click "Cập nhật" trên đơn hàng cần xử lý
3. Chọn trạng thái mới
4. Click "Lưu"
5. Hệ thống cập nhật trạng thái
6. Xử lý logic theo trạng thái:
   - CONFIRMED → Đánh dấu confirmedAt
   - SHIPPING → Đánh dấu shippedAt
   - COMPLETED → Đánh dấu completedAt, cập nhật payment
   - CANCELLED → Hoàn tồn kho
7. Hiển thị thông báo thành công

**Trạng thái hợp lệ**:
```
PENDING → CONFIRMED, CANCELLED
CONFIRMED → SHIPPING, CANCELLED
SHIPPING → COMPLETED, CANCELLED
COMPLETED → (terminal)
CANCELLED → (terminal)
```

**Post-conditions**: Trạng thái đơn hàng được cập nhật

---

## UC-027: Thống kê doanh thu

**Mô tả**: Admin xem báo cáo thống kê doanh thu

**Actor**: Admin

**Pre-conditions**: Admin đã đăng nhập

**Flow chính**:
1. Admin truy cập trang thống kê
2. Chọn khoảng thời gian (mặc định: tháng hiện tại)
3. Hệ thống tổng hợp dữ liệu từ bảng orders
4. Tính toán:
   - Tổng doanh thu (chỉ đơn COMPLETED)
   - Số đơn hàng theo từng trạng thái
   - Doanh thu theo ngày
   - Top sản phẩm bán chạy
5. Hiển thị dashboard với biểu đồ

**Post-conditions**: Dashboard hiển thị thống kê chính xác

---

## UC-015: Chatbot hỗ trợ

**Mô tả**: Khách hàng hỏi đáp với chatbot

**Actor**: Khách hàng

**Pre-conditions**: Không

**Flow chính**:
1. Khách hàng mở cửa sổ chatbot
2. Gõ tin nhắn và gửi
3. Hệ thống tìm kiếm trong chatbot_faqs:
   - Tìm keyword match
   - Tìm exact question match
4. Trả lời với FAQ phù hợp nhất
5. Hiển thị câu trả lời

**Flow phąi**:
- Không tìm thấy FAQ → Trả lời fallback có thể tư vấn thêm

**Post-conditions**: Tin nhắn được hiển thị trong chat
