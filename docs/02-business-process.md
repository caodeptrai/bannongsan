# 2. Quy Trình Nghiệp Vụ

## 2.1 Quy trình bán hàng

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Khách     │───▶│   Xem SP    │───▶│   Giỏ hàng │───▶│   Đặt hàng  │───▶│   Thanh toán │
│   hàng      │    │   sản phẩm  │    │   Thêm SP   │    │   Nhập TT   │    │   COD/TT    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                                                                                   │
                                                                                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Hoàn      │◀───│   Giao      │◀───│   Xác nhận │◀───│   Chờ xác   │◀───│   Tạo đơn   │
│   thành     │    │   hàng      │    │   đơn hàng  │    │   nhận      │    │   hàng mới  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

## 2.2 Quy trình quản lý đơn hàng (Admin)

```
┌─────────────┐
│   Đơn mới   │
│   PENDING   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Xác nhận  │────▶ CONFIRMED
│  đơn hàng  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Đang giao  │────▶ SHIPPING
│  hàng      │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Hoàn thành │────▶ COMPLETED
│  đơn hàng  │
└─────────────┘

Note: Từ PENDING có thể chuyển sang CANCELLED
```

## 2.3 Quy trình thanh toán

### 2.3.1 COD (Cash on Delivery)
1. Khách đặt hàng và chọn thanh toán COD
2. Hệ thống tạo đơn hàng với trạng thái PENDING
3. Admin xác nhận đơn hàng
4. Giao hàng cho khách
5. Khách thanh toán tiền mặt khi nhận hàng
6. Admin cập nhật trạng thái COMPLETED

### 2.3.2 Chuyển khoản ngân hàng
1. Khách đặt hàng và chọn chuyển khoản
2. Hệ thống tạo đơn với payment PENDING
3. Khách chuyển khoản theo thông tin tài khoản
4. Admin xác nhận đã nhận tiền
5. Cập nhật payment status = PAID

## 2.4 Quy trình chatbot

```
┌─────────────┐
│  Khách hỏi  │
│  tin nhắn   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Tìm kiếm  │────▶ Từ khóa trong FAQ database
│  FAQ phù   │
│  hợp       │
└──────┬──────┘
       │
       ├─── Tìm thấy ───▶ Trả lời với câu hỏi phù hợp
       │
       └─── Không tìm thấy ───▶ Trả lời mặc định
```

## 2.5 Quy trình quản lý sản phẩm

```
┌─────────────┐
│  Tạo sản   │───▶ Nhập thông tin sản phẩm
│  phẩm mới  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Upload    │───▶ Thêm hình ảnh sản phẩm
│  hình ảnh  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Cập nhật  │───▶ Giá, tồn kho, trạng thái
│  thông tin │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Sản phẩm  │───▶ Hiển thị trên website
│  hoàn tất  │
└─────────────┘
```

## 2.6 Quy trình thống kê doanh thu

1. Admin chọn khoảng thời gian thống kê
2. Hệ thống tổng hợp dữ liệu từ:
   - Bảng Orders (đơn hàng đã hoàn thành)
   - Bảng OrderItems (chi tiết sản phẩm)
3. Tính toán:
   - Tổng doanh thu
   - Số đơn hàng
   - Giá trị trung bình/đơn
   - Top sản phẩm bán chạy
   - Biểu đồ doanh thu theo ngày
4. Hiển thị dashboard với HighCharts

## 2.7 Chính sách giao hàng

- **Nội thành TP.HCM**: Giao trong 2-4 giờ
- **Các tỉnh thành khác**: 1-3 ngày tùy khu vực
- **Miễn phí giao hàng**: Đơn từ 500.000đ
- **Phí giao hàng**:
  - Đơn dưới 200.000đ: 25.000đ
  - Đơn 200.000đ - 500.000đ: 15.000đ
  - Đơn từ 500.000đ: Miễn phí

## 2.8 Chính sách đổi trả

- Đổi trả trong 24 giờ nếu sản phẩm không đúng mô tả
- Sản phẩm phải còn nguyên vẹn, chưa qua sử dụng
- Hoàn tiền qua phương thức thanh toán ban đầu
