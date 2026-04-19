# 5. Danh sách Use Case

## 5.1 Use Case Diagram (Mô tả văn bản)

### Actor: Khách hàng (Customer)
| ID | Tên Use Case | Mô tả |
|----|--------------|--------|
| UC-001 | Đăng ký tài khoản | Tạo tài khoản mới để mua hàng |
| UC-002 | Đăng nhập | Đăng nhập vào hệ thống |
| UC-003 | Đăng xuất | Thoát khỏi hệ thống |
| UC-004 | Xem sản phẩm | Duyệt danh sách sản phẩm |
| UC-005 | Tìm kiếm sản phẩm | Tìm sản phẩm theo từ khóa |
| UC-006 | Lọc sản phẩm | Lọc theo danh mục, giá |
| UC-007 | Xem chi tiết sản phẩm | Xem thông tin đầy đủ sản phẩm |
| UC-008 | Thêm vào giỏ hàng | Thêm sản phẩm vào giỏ |
| UC-009 | Cập nhật giỏ hàng | Sửa số lượng, xóa sản phẩm |
| UC-010 | Đặt hàng | Tạo đơn hàng từ giỏ hàng |
| UC-011 | Xem đơn hàng | Xem danh sách và chi tiết đơn hàng |
| UC-012 | Hủy đơn hàng | Hủy đơn hàng đang chờ |
| UC-013 | Chat với chatbot | Hỏi đáp với chatbot |
| UC-014 | Cập nhật hồ sơ | Thay đổi thông tin cá nhân |

### Actor: Quản trị viên (Admin)
| ID | Tên Use Case | Mô tả |
|----|--------------|--------|
| UC-015 | Đăng nhập Admin | Đăng nhập với quyền admin |
| UC-016 | Dashboard | Xem thống kê tổng quan |
| UC-017 | Quản lý danh mục | CRUD danh mục sản phẩm |
| UC-018 | Quản lý sản phẩm | CRUD sản phẩm |
| UC-019 | Quản lý đơn hàng | Xem và cập nhật trạng thái đơn |
| UC-020 | Quản lý khách hàng | Xem, khóa tài khoản |
| UC-021 | Thống kê doanh thu | Xem báo cáo, biểu đồ |

## 5.2 Biểu đồ Use Case

```
┌─────────────────────────────────────────────────────────────┐
│                     WEBBANHOAQUA SYSTEM                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐                    ┌─────────────┐      │
│   │  Khách hàng  │                    │     Admin    │      │
│   └──────┬──────┘                    └──────┬──────┘      │
│          │                                  │              │
│          │                                  │              │
│          │  ┌──────────────────────────────┴───────────┐  │
│          │  │              SYSTEM                      │  │
│          │  │                                           │  │
│          ├──│- Đăng ký/Đăng nhập                      │  │
│          ├──│- Xem sản phẩm                           │  │
│          ├──│- Tìm kiếm/Lọc sản phẩm                 │  │
│          ├──│- Xem chi tiết sản phẩm                 │  │
│          ├──│- Giỏ hàng (thêm/sửa/xóa)              │  │
│          ├──│- Đặt hàng                             │  │
│          ├──│- Xem/Hủy đơn hàng                     │  │
│          ├──│- Chatbot                               │  │
│          ├──│- Hồ sơ cá nhân                        │  │
│          │  │                                           │  │
│          │  │- Dashboard (Admin)                     │──│
│          │  │- Quản lý danh mục                      │──│
│          │  │- Quản lý sản phẩm                      │──│
│          │  │- Quản lý đơn hàng                     │──│
│          │  │- Quản lý khách hàng                   │──│
│          │  │- Thống kê doanh thu                   │──│
│          │  └────────────────────────────────────────┘  │
│          │                                               │
│          └───────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────────┘
```

## 5.3 Mô tả quan hệ giữa các Use Case

### Include (Bao gồm)
- UC-010 (Đặt hàng) **include** UC-009 (Giỏ hàng)
- UC-011 (Xem đơn hàng) **include** UC-002 (Đăng nhập)
- UC-016 (Dashboard) **include** UC-019, UC-021

### Extend (Mở rộng)
- UC-013 (Chat) **extend** chức năng hỗ trợ
- UC-012 (Hủy đơn) **extend** UC-011 (Xem đơn hàng)
