# WebBanHoaQua - Website Bán Nông Sản

## 1. Giới thiệu dự án

**WebBanHoaQua** là hệ thống website thương mại điện tử chuyên cung cấp và bán các loại nông sản tươi ngon, chất lượng cao. Dự án được xây dựng theo mô hình web client-server với đầy đủ chức năng cho cả khách hàng và quản trị viên.

### 1.1 Mục tiêu dự án
- Cung cấp nền tảng mua sắm nông sản trực tuyến tiện lợi cho khách hàng
- Hệ thống quản lý đơn hàng, sản phẩm, khách hàng cho quản trị viên
- Tích hợp chatbot hỗ trợ tư vấn và tra cứu thông tin sản phẩm
- Dashboard thống kê doanh thu theo thời gian thực

### 1.2 Đối tượng sử dụng
- **Khách hàng**: Người mua hàng trực tuyến
- **Quản trị viên**: Người quản lý cửa hàng, sản phẩm, đơn hàng

## 2. Công nghệ sử dụng

### 2.1 Frontend
- **Angular 17** - Framework frontend hiện đại
- **TypeScript** - Ngôn ngữ lập trình chính
- **Angular Router** - Quản lý định tuyến
- **Angular Reactive Forms** - Xử lý form
- **RxJS** - Xử lý bất đồng bộ
- **HighCharts** - Vẽ biểu đồ thống kê

### 2.2 Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web server
- **TypeScript** - Ngôn ngữ lập trình
- **Prisma ORM** - Quản lý database
- **JWT** - Xác thực người dùng
- **bcryptjs** - Mã hóa mật khẩu

### 2.3 Database
- **MySQL** - Hệ quản trị cơ sở dữ liệu

## 3. Kiến trúc hệ thống

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Browser        │────▶│   Angular App    │────▶│   Express API   │
│   (Client)       │◀────│   (Port 4200)   │◀────│   (Port 5000)   │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                          │
                                                          ▼
                                                 ┌─────────────────┐
                                                 │   MySQL DB       │
                                                 │   (Port 3306)    │
                                                 └─────────────────┘
```

## 4. Tính năng chính

### 4.1 Phía Khách hàng
- Xem danh sách sản phẩm nông sản
- Chi tiết sản phẩm với hình ảnh, mô tả, đánh giá
- Tìm kiếm và lọc sản phẩm theo danh mục, giá
- Đăng ký / đăng nhập tài khoản
- Quản lý giỏ hàng (thêm, sửa, xóa)
- Đặt hàng trực tuyến với nhiều phương thức thanh toán
- Xem lịch sử và trạng thái đơn hàng
- Chatbot tư vấn sản phẩm 24/7

### 4.2 Phía Quản trị viên
- Dashboard tổng quan với thống kê
- Quản lý danh mục sản phẩm (CRUD)
- Quản lý sản phẩm (CRUD, cập nhật tồn kho, giá)
- Quản lý khách hàng (xem, khóa/mở tài khoản)
- Quản lý đơn hàng (cập nhật trạng thái, hủy đơn)
- Thống kê doanh thu theo ngày/tháng/khoảng thời gian
- Top sản phẩm bán chạy

## 5. Mô hình dữ liệu chính

- **Users**: Người dùng (khách hàng, admin)
- **Categories**: Danh mục sản phẩm
- **Products**: Sản phẩm nông sản
- **ProductImages**: Hình ảnh sản phẩm
- **Orders**: Đơn hàng
- **OrderItems**: Chi tiết đơn hàng
- **Payments**: Thanh toán
- **Carts/CartItems**: Giỏ hàng
- **Reviews**: Đánh giá sản phẩm
- **ChatbotFAQs**: Câu hỏi chatbot

## 6. Phiên bản

- **Version**: 1.0.0
- **Ngày phát hành**: 2026
- **Trạng thái**: Hoàn thành

## 7. Tác giả

Dự án tốt nghiệp - Công nghệ Web
