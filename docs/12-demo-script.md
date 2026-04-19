# 12. Demo Script - Kịch bản Demo Đồ Án

## 12.1 Chuẩn bị trước khi demo

### Mở 2 terminal windows:
**Terminal 1 (Backend)**:
```bash
cd D:/Project/Webbanhoaqua/backend
npm run dev
```

**Terminal 2 (Frontend)**:
```bash
cd D:/Project/Webbanhoaqua/frontend-angular
npm start
```

### Mở trình duyệt:
- Frontend: http://localhost:4200
- Backend API: http://localhost:5000/api/health

### Đăng nhập sẵn 2 tab:
1. **Tab Khách hàng**: http://localhost:4200 (user1@example.com)
2. **Tab Admin**: http://localhost:4200/admin (admin@example.com)

---

## 12.2 Demo Flow - Phần 1: Khách hàng

### Scene 1: Truy cập Website (2 phút)
1. Mở website, giới thiệu trang chủ
2. Giới thiệu banner, các danh mục sản phẩm
3. Highlight: Sản phẩm nổi bật, hàng mới về

### Scene 2: Xem và tìm kiếm sản phẩm (3 phút)
1. Click vào "Sản phẩm" → Giới thiệu trang danh sách
2. Thao tác tìm kiếm: Gõ "xoai" → Enter
3. Lọc theo danh mục: Chọn "Trái Cây Tươi"
4. Lọc theo giá: 50.000 - 100.000
5. Sắp xếp: Giá thấp đến cao

### Scene 3: Xem chi tiết sản phẩm (2 phút)
1. Click vào sản phẩm "Xoài Cát Hòa Lộc"
2. Giới thiệu: Hình ảnh, giá, mô tả, đánh giá
3. Xem sản phẩm liên quan bên dưới

### Scene 4: Đăng ký / Đăng nhập (2 phút)
1. Click "Đăng nhập" → Điền user1@example.com / 123456
2. Giới thiệu form đăng nhập
3. Đăng nhập thành công, redirect về trang chủ

### Scene 5: Thêm vào giỏ hàng (3 phút)
1. Quay lại trang sản phẩm "Xoài Cát Hòa Lộc"
2. Click "Thêm vào giỏ hàng"
3. Thêm "Bưởi Da Xanh" vào giỏ
4. Thêm "Gạo ST25" vào giỏ
5. Mở giỏ hàng → Giới thiệu các sản phẩm đã thêm

### Scene 6: Checkout và đặt hàng (3 phút)
1. Click "Tiến hành đặt hàng"
2. Giới thiệu form thông tin giao hàng (đã điền sẵn từ profile)
3. Chọn phương thức thanh toán: COD
4. Xem lại đơn hàng và tổng tiền
5. Click "Đặt hàng ngay"
6. Hiển thị thông báo thành công với mã đơn hàng

### Scene 7: Xem đơn hàng (2 phút)
1. Click vào "Đơn hàng" trong menu user
2. Giới thiệu danh sách đơn hàng với trạng thái
3. Click vào đơn vừa đặt → Xem chi tiết

### Scene 8: Chatbot (2 phút)
1. Mở chatbot ở góc phải dưới
2. Hỏi: "Còn bưởi da xanh không?"
3. Hỏi: "Sản phẩm nào bán chạy nhất?"
4. Hỏi: "Giờ mở cửa?"

---

## 12.3 Demo Flow - Phần 2: Admin Dashboard

### Scene 9: Dashboard tổng quan (2 phút)
1. Chuyển sang Tab Admin
2. Giới thiệu Dashboard với các thống kê:
   - Tổng người dùng
   - Tổng sản phẩm
   - Tổng đơn hàng
   - Tổng doanh thu
3. Giới thiệu đơn hàng gần đây

### Scene 10: Quản lý đơn hàng (4 phút)
1. Click "Đơn hàng" trong sidebar
2. Giới thiệu danh sách đơn hàng
3. Lọc theo trạng thái: "Chờ xác nhận"
4. Click "Cập nhật" trên đơn hàng vừa tạo
5. Đổi trạng thái: PENDING → CONFIRMED → SHIPPING → COMPLETED
6. Giải thích logic theo workflow

### Scene 11: Quản lý sản phẩm (3 phút)
1. Click "Sản phẩm" trong sidebar
2. Giới thiệu danh sách sản phẩm
3. Tìm kiếm sản phẩm "Gạo"
4. Click "Sửa" trên một sản phẩm
5. Thay đổi giá hoặc tồn kho → Lưu
6. Click "Thêm sản phẩm" → Giới thiệu form

### Scene 12: Quản lý danh mục (2 phút)
1. Click "Danh mục" trong sidebar
2. Giới thiệu danh sách danh mục
3. Click "Thêm danh mục" → Điền thông tin
4. Click "Sửa" trên một danh mục

### Scene 13: Quản lý khách hàng (2 phút)
1. Click "Khách hàng" trong sidebar
2. Giới thiệu danh sách người dùng
3. Click khóa/mở tài khoản một user

### Scene 14: Thống kê doanh thu (3 phút)
1. Click "Thống kê" trong sidebar
2. Giới thiệu các thống kê:
   - Tổng doanh thu
   - Số đơn hàng
   - Top sản phẩm bán chạy
3. Xem theo khoảng thời gian khác

---

## 12.4 Kết thúc Demo

### Các điểm để nhấn mạnh:

1. **Kiến trúc Clean Architecture**
   - Backend: routes → controllers → services → database
   - Frontend: modules → components → services

2. **Tính năng đầy đủ**
   - Customer: Đăng nhập, giỏ hàng, đặt hàng, chatbot
   - Admin: Dashboard, CRUD sản phẩm, quản lý đơn hàng, thống kê

3. **Bảo mật**
   - JWT Authentication
   - Phân quyền user/admin
   - Validation input

4. **Code quality**
   - TypeScript typed
   - Separation of concerns
   - Clean code structure

5. **Database Design**
   - Prisma ORM với relationships rõ ràng
   - Seed data đầy đủ

### Thời gian demo ước tính:
- **Tổng**: 25-30 phút
- Phần khách hàng: 15 phút
- Phần admin: 12 phút
- Q&A: 5 phút

---

## 12.5 Backup Plan

Nếu có sự cố kỹ thuật:
1. **Backend không chạy**: Kiểm tra MySQL, chạy lại `npm run dev`
2. **Frontend lỗi**: Kiểm tra API http://localhost:5000/api/health
3. **Không load được hình ảnh**: Kiểm tra kết nối internet
4. **Database lỗi**: Chạy lại seed nếu cần

### Liên hệ hỗ trợ:
Email: contact@webbanhoaqua.com
Hotline: 0909.123.456
