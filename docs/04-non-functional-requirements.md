# 4. Yêu cầu phi chức năng

## 4.1 Hiệu năng (Performance)

| Tiêu chí | Yêu cầu |
|----------|----------|
| Thời gian phản hồi API | < 200ms với 95% request |
| Thời gian tải trang | < 3s với băng thông thông thường |
| Số người dùng đồng thời | Hỗ trợ 100+ người dùng đồng thời |
| Database queries | Tối ưu với indexes, tránh N+1 queries |

## 4.2 Bảo mật (Security)

| Tiêu chí | Yêu cầu |
|----------|----------|
| Mật khẩu | Mã hóa bcrypt với salt rounds = 10 |
| Xác thực | JWT với thời hạn 7 ngày |
| Phân quyền | Role-based access control (USER/ADMIN) |
| Input validation | Validate tất cả dữ liệu đầu vào |
| SQL Injection | Sử dụng Prisma ORM, tránh raw SQL |
| XSS | Angular auto-escape, sanitize user input |

## 4.3 Khả dụng (Availability)

| Tiêu chí | Yêu cầu |
|----------|----------|
| Uptime | 99.9% thời gian |
| Backup | Backup database hàng ngày |
| Error handling | Xử lý lỗi graceful, không crash |

## 4.4 Khả năng mở rộng (Scalability)

- Kiến trúc modular, dễ thêm module mới
- API RESTful, dễ tích hợp mobile app
- Database schema có thể mở rộng
- Code separation (frontend/backend)

## 4.5 Khả năng bảo trì (Maintainability)

| Tiêu chí | Yêu cầu |
|----------|----------|
| Code structure | Clean Architecture, separation of concerns |
| Naming convention | Quy tắc đặt tên nhất quán |
| Documentation | Code comments, README đầy đủ |
| Testing | Unit test cho các service quan trọng |
| Error logging | Log lỗi ra console/file |

## 4.6 Tính khả dụng (Usability)

- Giao diện thân thiện, dễ sử dụng
- Responsive design (desktop, tablet, mobile)
- Hỗ trợ tiếng Việt
- Thông báo lỗi rõ ràng, có ích
- Loading indicators cho async operations
- Form validation real-time

## 4.7 Tính tương thích (Compatibility)

| Nền tảng | Phiên bản |
|----------|-----------|
| Browser | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| Angular | 17.x |
| Node.js | 18.x+ |
| MySQL | 8.0+ |
| TypeScript | 5.x |

## 4.8 Triển khai (Deployment)

- Chạy local được với Docker hoặc npm
- Cấu hình qua environment variables
- Build production với optimization
- Database migration tự động
