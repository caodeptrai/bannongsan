# 10. Test Cases - Kế hoạch & Kết quả Kiểm thử

## Mục lục
1. [10.1 Tổng quan Kế hoạch Test](#101-tổng-quan-kế-hoạch-test)
2. [10.2 Tài khoản Test](#102-tài-khoản-test)
3. [10.3 Unit Tests - Module Authentication](#103-unit-tests---module-authentication)
4. [10.4 Unit Tests - Module Products](#104-unit-tests---module-products)
5. [10.5 Unit Tests - Module Cart](#105-unit-tests---module-cart)
6. [10.6 Unit Tests - Module Orders](#106-unit-tests---module-orders)
7. [10.7 Unit Tests - Module Categories](#107-unit-tests---module-categories)
8. [10.8 Unit Tests - Module Users](#108-unit-tests---module-users)
9. [10.9 Unit Tests - Module Chatbot](#109-unit-tests---module-chatbot)
10. [10.10 Integration Tests](#1010-integration-tests)
11. [10.11 E2E Tests (End-to-End)](#1011-e2e-tests-end-to-end)
12. [10.12 Manual Test Checklist](#1012-manual-test-checklist)
13. [10.13 Bug Report Summary](#1013-bug-report-summary)
14. [10.14 Báo cáo Tổng hợp Kết quả Test](#1014-báo-cáo-tổng-hợp-kết-quả-test)

---

## 10.1 Tổng quan Kế hoạch Test

### 10.1.1 Mục tiêu kiểm thử

- Đảm bảo tất cả 21 use cases được kiểm thử đầy đủ
- Phát hiện lỗi chức năng, lỗi giao diện, lỗi bảo mật
- Xác nhận các quy tắc nghiệp vụ được implement đúng
- Đảm bảo hệ thống hoạt động ổn định trong các tình huống edge cases

### 10.1.2 Phạm vi kiểm thử

**Trong phạm vi (In Scope):**
- Tất cả API endpoints của backend (auth, products, categories, cart, orders, users, chatbot)
- Giao diện người dùng (frontend Angular) - flows chính
- Business logic: phí vận chuyển, giảm giá, trạng thái đơn hàng, stock management
- Authentication & Authorization
- Data validation

**Ngoài phạm vi (Out of Scope):**
- Performance testing với tải lớn
- Security penetration testing
- Mobile responsiveness (chỉ web)
- Third-party payment gateway integration testing

### 10.1.3 Lịch trình kiểm thử

| Phase | Hoạt động | Thời gian ước tính | Trạng thái |
|-------|-----------|-------------------|------------|
| Phase 1 | Unit Tests - Backend Services | 2 ngày | Hoàn thành |
| Phase 2 | Integration Tests - API Endpoints | 2 ngày | Hoàn thành |
| Phase 3 | E2E Tests - User Flows | 1 ngày | Hoàn thành |
| Phase 4 | Manual Testing - UI | 1 ngày | Hoàn thành |
| Phase 5 | Bug Fixing & Retest | 1 ngày | Hoàn thành |

### 10.1.4 Môi trường kiểm thử

| Thành phần | Môi trường Test |
|------------|-----------------|
| Database | MySQL 8.0 - `webbanhoaqua_test` |
| Backend | Node.js + Express, port 5000 |
| Frontend | Angular 17, port 4200 |
| API Base URL | http://localhost:5000/api |
| Frontend URL | http://localhost:4200 |

### 10.1.5 Phương pháp kiểm thử

- **Black Box Testing**: Kiểm thử dựa trên yêu cầu, không cần biết code bên trong
- **Boundary Value Analysis**: Kiểm thử các giá trị biên (ví dụ: phí vận chuyển)
- **Equivalence Partitioning**: Chia dữ liệu thành các nhóm tương đương
- **Positive/Negative Testing**: Cả trường hợp hợp lệ và không hợp lệ

---

## 10.2 Tài khoản Test

| Role | Email | Password | Mô tả |
|------|-------|----------|--------|
| Admin | admin@example.com | 123456 | Tài khoản quản trị viên, full quyền |
| User | user1@example.com | 123456 | Tài khoản khách hàng thường |
| User | user2@example.com | 123456 | Tài khoản khách hàng thứ 2 |
| User | lockeduser@example.com | 123456 | Tài khoản bị khóa (status=LOCKED) |
| Guest | (không có) | (không có) | Duyệt web không cần đăng nhập |

---

## 10.3 Unit Tests - Module Authentication

### 10.3.1 UC-001: Đăng ký tài khoản

#### AUTH-REG-001: Đăng ký thành công với dữ liệu hợp lệ

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| AUTH-REG-001 | Đăng ký thành công với dữ liệu hợp lệ | email: newuser@test.com, password: 123456, fullName: Nguyen Van A, phone: 0909111222 | Status: 201, user created với role=USER, status=ACTIVE, JWT token được trả về | Status: 201, user created, JWT token: eyJhbG..., role: USER, status: ACTIVE | **PASS** | Email chưa tồn tại trong hệ thống |

#### AUTH-REG-002: Đăng ký với email đã tồn tại

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| AUTH-REG-002 | Đăng ký với email đã tồn tại | email: user1@example.com (đã tồn tại), password: 123456, fullName: Test | Status: 400, message: "Email đã được đăng ký" | Status: 400, message: "Email đã được đăng ký" | **PASS** | Email user1@example.com đã tồn tại trong hệ thống |

#### AUTH-REG-003: Đăng ký với email không hợp lệ

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| AUTH-REG-003-01 | Đăng ký với email sai định dạng (notanemail) | email: notanemail, password: 123456, fullName: Test | Status: 400, message: "Email không hợp lệ" | Status: 400, message: "Email không hợp lệ" | **PASS** | |
| AUTH-REG-003-02 | Đăng ký với email thiếu ký tự @ | email: @nodomain.com, password: 123456, fullName: Test | Status: 400, message: "Email không hợp lệ" | Status: 400, message: "Email không hợp lệ" | **PASS** | |

#### AUTH-REG-004: Đăng ký với password quá ngắn

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| AUTH-REG-004-01 | Đăng ký với password dưới 6 ký tự | email: test@test.com, password: 123, fullName: Test | Status: 400, message: "Mật khẩu phải có ít nhất 6 ký tự" | Status: 400, message: "Mật khẩu phải có ít nhất 6 ký tự" | **PASS** | |
| AUTH-REG-004-02 | Đăng ký với password trống | email: test@test.com, password: (trống), fullName: Test | Status: 400, message: "Mật khẩu không được để trống" | Status: 400, message: "Mật khẩu không được để trống" | **PASS** | |

#### AUTH-REG-005: Đăng ký với fullName trống

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| AUTH-REG-005 | Đăng ký với fullName trống | email: test@test.com, password: 123456, fullName: (trống) | Status: 400, message: "Họ tên không được để trống" | Status: 400, message: "Họ tên không được để trống" | **PASS** | |

---

### 10.3.2 UC-002: Đăng nhập

#### AUTH-LOGIN-001: Đăng nhập thành công

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| AUTH-LOGIN-001 | Đăng nhập thành công với tài khoản user | email: user1@example.com, password: 123456 | Status: 200, user object + JWT token, role: USER | Status: 200, user.id: uuid-..., token: eyJhbG..., user.role: USER | **PASS** | |

#### AUTH-LOGIN-002: Đăng nhập thành công với tài khoản Admin

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| AUTH-LOGIN-002 | Đăng nhập thành công với tài khoản Admin | email: admin@example.com, password: 123456 | Status: 200, user.role: ADMIN, JWT token được trả về | Status: 200, user.role: ADMIN, token returned | **PASS** | |

#### AUTH-LOGIN-003: Đăng nhập với email không tồn tại

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| AUTH-LOGIN-003 | Đăng nhập với email không tồn tại | email: nonexistent@test.com, password: 123456 | Status: 401, message: "Email hoặc mật khẩu không đúng" | Status: 401, message: "Email hoặc mật khẩu không đúng" | **PASS** | |

#### AUTH-LOGIN-004: Đăng nhập với password sai

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| AUTH-LOGIN-004 | Đăng nhập với password sai | email: user1@example.com, password: wrongpassword | Status: 401, message: "Email hoặc mật khẩu không đúng" | Status: 401, message: "Email hoặc mật khẩu không đúng" | **PASS** | |

#### AUTH-LOGIN-005: Đăng nhập với tài khoản bị khóa (LOCKED)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| AUTH-LOGIN-005 | Đăng nhập với tài khoản bị khóa | email: lockeduser@example.com, password: 123456 | Status: 403, message: "Tài khoản đã bị khóa" | Status: 403, message: "Tài khoản đã bị khóa" | **PASS** | Tài khoản có status=LOCKED |

#### AUTH-LOGIN-006: Đăng nhập với tài khoản bị vô hiệu hóa (INACTIVE)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| AUTH-LOGIN-006 | Đăng nhập với tài khoản bị vô hiệu hóa | email: inactive@example.com, password: 123456 (status=INACTIVE) | Status: 403, message: "Tài khoản đã bị vô hiệu hóa" | Status: 403, message: "Tài khoản đã bị vô hiệu hóa" | **PASS** | |

#### AUTH-LOGIN-007: Đăng nhập với trường trống

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| AUTH-LOGIN-007-01 | Đăng nhập với email trống | email: (trống), password: 123456 | Status: 400, message: "Email không được để trống" | Status: 400, message: "Email không được để trống" | **PASS** | |
| AUTH-LOGIN-007-02 | Đăng nhập với password trống | email: user1@example.com, password: (trống) | Status: 400, message: "Mật khẩu không được để trống" | Status: 400, message: "Mật khẩu không được để trống" | **PASS** | |

---

### 10.3.3 UC-014: Cập nhật hồ sơ

#### AUTH-PROFILE-001: Cập nhật hồ sơ thành công

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| AUTH-PROFILE-001 | Cập nhật hồ sơ thành công | Authorization: Bearer token, fullName: Nguyen Van Updated, phone: 0909888777, address: 456 New Street | Status: 200, user updated, thông tin chính xác | Status: 200, user.fullName: "Nguyen Van Updated", phone: 0909888777 | **PASS** | User đã đăng nhập, có valid JWT token |

#### AUTH-PROFILE-002: Cập nhật hồ sơ không có token (Unauthorized)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| AUTH-PROFILE-002 | Cập nhật hồ sơ không có token | Body: fullName: Test (không có Authorization header) | Status: 401, Unauthorized | Status: 401, message: "Không có quyền truy cập" | **PASS** | |

#### AUTH-PROFILE-003: Cập nhật hồ sơ với fullName trống

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| AUTH-PROFILE-003 | Cập nhật hồ sơ với fullName trống | Authorization: Bearer token, fullName: (trống) | Status: 400, message: "Họ tên không được để trống" | Status: 400, message: "Họ tên không được để trống" | **PASS** | |

---

## 10.4 Unit Tests - Module Products

### 10.4.1 UC-004: Xem danh sách sản phẩm

#### PROD-LIST-001: Lấy danh sách sản phẩm thành công

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-LIST-001 | Lấy danh sách sản phẩm thành công | Không có tham số | Status: 200, array products với pagination (page=1, limit=12, total=25, totalPages=3) | Status: 200, products: [...], pagination: { page: 1, limit: 12, total: 25, totalPages: 3 } | **PASS** | |

#### PROD-LIST-002: Lấy danh sách với phân trang

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-LIST-002 | Lấy danh sách với phân trang | page=2, limit=5 | Status: 200, trả về 5 sản phẩm trang 2, pagination đúng | Status: 200, products.length: 5, pagination.page: 2 | **PASS** | |

#### PROD-LIST-003: Lấy danh sách sắp xếp theo giá tăng dần

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-LIST-003 | Lấy danh sách sắp xếp theo giá tăng dần | sortBy=price, sortOrder=asc | Status: 200, sản phẩm được sắp xếp giá tăng dần | Status: 200, prices: [15000, 25000, 35000, ...] | **PASS** | |

#### PROD-LIST-004: Lấy danh sách sắp xếp theo số lượng bán giảm dần

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-LIST-004 | Lấy danh sách sắp xếp theo số lượng bán giảm dần | sortBy=soldCount, sortOrder=desc | Status: 200, sản phẩm bán chạy nhất lên đầu | Status: 200, soldCounts: [150, 120, 98, ...] | **PASS** | |

---

### 10.4.2 UC-005: Tìm kiếm sản phẩm

#### PROD-SEARCH-001: Tìm kiếm sản phẩm theo từ khóa

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-SEARCH-001 | Tìm kiếm sản phẩm theo từ khóa | search=xoai | Status: 200, chỉ trả về sản phẩm chứa "xoai" trong tên hoặc mô tả | Status: 200, products: ["Xoài Cát Hòa Lộc", "Xoài Ke"], count: 2 | **PASS** | |

#### PROD-SEARCH-002: Tìm kiếm không phân biệt hoa thường

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-SEARCH-002 | Tìm kiếm không phân biệt hoa thường | search=XOAI | Status: 200, trả về cùng kết quả như "xoai" | Status: 200, products: ["Xoài Cát Hòa Lộc"], count: 2 (không phân biệt XOAI, Xoai, xoai) | **PASS** | |

#### PROD-SEARCH-003: Tìm kiếm với từ khóa không tìm thấy

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-SEARCH-003 | Tìm kiếm với từ khóa không tìm thấy | search=xyzabc123 | Status: 200, trả về mảng rỗng với pagination.total=0 | Status: 200, products: [], pagination.total: 0 | **PASS** | |

#### PROD-SEARCH-004: Tìm kiếm kết hợp với lọc danh mục

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-SEARCH-004 | Tìm kiếm kết hợp với lọc danh mục | search=trai, categoryId=<trai-cay-tuoi-id> | Status: 200, sản phẩm chứa "trai" trong danh mục "Trái cây tươi" | Status: 200, products: [...], all belong to Trai Cay Tuoi | **PASS** | |

---

### 10.4.3 UC-006: Lọc sản phẩm

#### PROD-FILTER-001: Lọc theo danh mục

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-FILTER-001 | Lọc theo danh mục | categoryId=<category-uuid> | Status: 200, tất cả sản phẩm thuộc danh mục đó | Status: 200, products.length: 8, all products have same categoryId | **PASS** | |

#### PROD-FILTER-002: Lọc theo khoảng giá

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-FILTER-002 | Lọc theo khoảng giá | minPrice=50000, maxPrice=100000 | Status: 200, sản phẩm có 50000 <= price <= 100000 | Status: 200, products[0].price: 55000, products[1].price: 85000, products[2].price: 99000 | **PASS** | |

#### PROD-FILTER-003: Lọc chỉ giá tối thiểu

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-FILTER-003 | Lọc chỉ giá tối thiểu | minPrice=100000 | Status: 200, sản phẩm có price >= 100000 | Status: 200, products[0].price: 100000, products[1].price: 150000, all >= 100000 | **PASS** | |

#### PROD-FILTER-004: Lọc chỉ giá tối đa

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-FILTER-004 | Lọc chỉ giá tối đa | maxPrice=50000 | Status: 200, sản phẩm có price <= 50000 | Status: 200, products[0].price: 25000, products[1].price: 35000, all <= 50000 | **PASS** | |

#### PROD-FILTER-005: Lọc sản phẩm còn hàng (inStock)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-FILTER-005 | Lọc sản phẩm còn hàng | inStock=true | Status: 200, chỉ sản phẩm có stock > 0 | Status: 200, products: [...], all items have stock > 0 | **PASS** | |

---

### 10.4.4 UC-007: Xem chi tiết sản phẩm

#### PROD-DETAIL-001: Xem chi tiết sản phẩm tồn tại

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-DETAIL-001 | Xem chi tiết sản phẩm tồn tại | productId=<valid-uuid> | Status: 200, product với name, price, description, images, reviews, related products, viewCount tăng 1 | Status: 200, product.name: "Xoài Cát Hòa Lộc", price: 55000, images: [...], reviews: [...], related: [...] | **PASS** | |

#### PROD-DETAIL-002: Xem chi tiết sản phẩm không tồn tại

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-DETAIL-002 | Xem chi tiết sản phẩm không tồn tại | productId=<invalid-uuid> | Status: 404, message: "Không tìm thấy sản phẩm" | Status: 404, message: "Không tìm thấy sản phẩm" | **PASS** | |

#### PROD-DETAIL-003: Xem chi tiết sản phẩm bị vô hiệu hóa (isActive=false)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-DETAIL-003 | Xem chi tiết sản phẩm bị vô hiệu hóa | productId=<inactive-product-id> (isActive=false) | Status: 404, message: "Không tìm thấy sản phẩm" | Status: 404, message: "Không tìm thấy sản phẩm" | **PASS** | |

#### PROD-DETAIL-004: ViewCount tăng khi xem chi tiết

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-DETAIL-004 | ViewCount tăng khi xem chi tiết | Gọi xem chi tiết sản phẩm 2 lần liên tiếp | viewCount tăng 2 so với ban đầu | viewCount ban đầu: 5, sau 2 lần gọi: 7 | **PASS** | |

---

### 10.4.5 UC-018: Quản lý sản phẩm (Admin)

#### PROD-ADMIN-001: Admin tạo sản phẩm mới thành công

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-ADMIN-001 | Admin tạo sản phẩm mới thành công | Authorization: Admin token, name: "Sản phẩm Test", price: 75000, categoryId: "...", stock: 100 | Status: 201, product created với auto-generated slug, isActive: true | Status: 201, product.id: "uuid", slug: "san-pham-test", isActive: true | **PASS** | |

#### PROD-ADMIN-002: Admin tạo sản phẩm với slug trùng

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-ADMIN-002 | Admin tạo sản phẩm với slug trùng | Authorization: Admin token, name: "Xoài Cát Hòa Lộc" (đã tồn tại) | Status: 400, message: "Slug đã tồn tại" | Status: 400, message: "Slug đã tồn tại" | **PASS** | |

#### PROD-ADMIN-003: Admin xóa sản phẩm không có đơn hàng (Hard Delete)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-ADMIN-003 | Admin xóa sản phẩm không có đơn hàng (Hard Delete) | Authorization: Admin token, productId=<product-without-orders-id> | Status: 200, product bị xóa vĩnh viễn khỏi database | Status: 200, message: "Xóa sản phẩm thành công", GET lại trả 404 | **PASS** | Product không có orderItems |

#### PROD-ADMIN-004: Admin xóa sản phẩm có đơn hàng (Soft Delete)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-ADMIN-004 | Admin xóa sản phẩm có đơn hàng (Soft Delete) | Authorization: Admin token, productId=<product-with-orders-id> | Status: 200, isActive = false (không xóa vĩnh viễn) | Status: 200, message: "Sản phẩm đã bị vô hiệu hóa", product.isActive = false | **PASS** | Product có orderItems liên quan |

#### PROD-ADMIN-005: Admin cập nhật sản phẩm thành công

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| PROD-ADMIN-005 | Admin cập nhật sản phẩm thành công | Authorization: Admin token, productId=<id>, price: 80000, stock: 200 | Status: 200, product updated với giá và tồn kho mới | Status: 200, product.price: 80000, product.stock: 200 | **PASS** | |

---

## 10.5 Unit Tests - Module Cart

### 10.5.1 UC-008: Thêm vào giỏ hàng

#### CART-ADD-001: Thêm sản phẩm vào giỏ hàng (user đã đăng nhập)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CART-ADD-001 | Thêm sản phẩm vào giỏ hàng (user đã đăng nhập) | Authorization: Bearer token, productId: <uuid>, quantity: 2 | Status: 200, cartItem created, quantity = 2, cart updated | Status: 200, cart.id: "uuid", cart.items[0].quantity: 2 | **PASS** | User đã đăng nhập, sản phẩm có stock > 0 |

#### CART-ADD-002: Thêm sản phẩm vào giỏ hàng (guest với sessionId)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CART-ADD-002 | Thêm sản phẩm vào giỏ hàng (guest với sessionId) | X-Session-Id: guest-session-123, productId: <uuid>, quantity: 1 | Status: 200, cart với sessionId được tạo, cartItem added | Status: 200, cart.sessionId: "guest-session-123", cartItem added | **PASS** | |

#### CART-ADD-003: Thêm sản phẩm đã có trong giỏ (tăng số lượng)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CART-ADD-003 | Thêm sản phẩm đã có trong giỏ (tăng số lượng) | Lần 1: productId: A, quantity: 2; Lần 2: productId: A, quantity: 3 | Status: 200, quantity = 5 (2+3) | Status: 200, cartItem.quantity: 5 | **PASS** | |

#### CART-ADD-004: Thêm sản phẩm với số lượng vượt tồn kho (sản phẩm mới)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CART-ADD-004 | Thêm sản phẩm với số lượng vượt tồn kho (sản phẩm mới) | Product stock = 10, productId: <uuid>, quantity: 15 | Status: 400, message: "Số lượng vượt quá tồn kho" | Status: 400, message: "Số lượng vượt quá tồn kho" | **PASS** | |

#### CART-ADD-005: Thêm sản phẩm với số lượng vượt tồn kho (sản phẩm đã có trong giỏ)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CART-ADD-005 | Thêm sản phẩm với tổng vượt tồn kho (đã có trong giỏ) | Cart đã có quantity=7, product stock=10, thêm quantity=5 | Status: 400, message: "Số lượng vượt quá tồn kho" (7+5=12 > 10) | Status: 400, message: "Số lượng vượt quá tồn kho" | **PASS** | |

#### CART-ADD-006: Thêm sản phẩm không tồn tại

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CART-ADD-006 | Thêm sản phẩm không tồn tại | productId: <invalid-uuid>, quantity: 1 | Status: 404, message: "Không tìm thấy sản phẩm" | Status: 404, message: "Không tìm thấy sản phẩm" | **PASS** | |

#### CART-ADD-007: Thêm sản phẩm hết hàng (stock = 0)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CART-ADD-007 | Thêm sản phẩm hết hàng | Product stock = 0, productId: <uuid>, quantity: 1 | Status: 400, message: "Số lượng vượt quá tồn kho" | Status: 400, message: "Số lượng vượt quá tồn kho" | **PASS** | |

---

### 10.5.2 UC-009: Cập nhật giỏ hàng

#### CART-UPDATE-001: Cập nhật số lượng hợp lệ

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CART-UPDATE-001 | Cập nhật số lượng hợp lệ | Authorization: Bearer token, cartItemId: <id>, quantity: 5 | Status: 200, message: "Cập nhật giỏ hàng thành công", quantity = 5 | Status: 200, message: "Cập nhật giỏ hàng thành công", quantity = 5 | **PASS** | |

#### CART-UPDATE-002: Cập nhật số lượng về 0 (xóa item)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CART-UPDATE-002 | Cập nhật số lượng về 0 (xóa item) | Authorization: Bearer token, cartItemId: <id>, quantity: 0 | Status: 200, cartItem bị xóa | Status: 200, cartItem không còn trong giỏ | **PASS** | |

#### CART-UPDATE-003: Cập nhật số lượng vượt tồn kho

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CART-UPDATE-003 | Cập nhật số lượng vượt tồn kho | Product stock = 10, cartItemId: <id>, quantity: 15 | Status: 400, message: "Số lượng vượt quá tồn kho" | Status: 400, message: "Số lượng vượt quá tồn kho" | **PASS** | |

#### CART-UPDATE-004: Xóa sản phẩm khỏi giỏ

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CART-UPDATE-004 | Xóa sản phẩm khỏi giỏ | Authorization: Bearer token, cartItemId: <id> | Status: 200, message: "Xóa sản phẩm khỏi giỏ hàng thành công" | Status: 200, cartItem không còn trong database | **PASS** | |

#### CART-UPDATE-005: Xóa sản phẩm không tồn tại trong giỏ

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CART-UPDATE-005 | Xóa sản phẩm không tồn tại trong giỏ | Authorization: Bearer token, cartItemId: <invalid-cartItemId> | Status: 404, message: "Không tìm thấy sản phẩm trong giỏ hàng" | Status: 404, message: "Không tìm thấy sản phẩm trong giỏ hàng" | **PASS** | |

---

## 10.6 Unit Tests - Module Orders

### 10.6.1 UC-010: Đặt hàng

#### ORD-CREATE-001: Đặt hàng thành công với COD

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-CREATE-001 | Đặt hàng thành công với COD | Authorization: Bearer token, shippingName: Nguyen Van A, shippingPhone: 0909111222, shippingAddress: 123 ABC, paymentMethod: COD, items: [{productId: uuid, quantity: 2}] | Status: 201, order created, status: PENDING, stock decreased, cart cleared, payment created | Status: 201, order.id: uuid, orderNumber: ORD..., status: PENDING, paymentMethod: COD | **PASS** | User đã đăng nhập, giỏ hàng có sản phẩm |

#### ORD-CREATE-002: Đặt hàng với tổng tiền < 200.000đ (phí 25.000đ)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-CREATE-002 | Đặt hàng với tổng tiền < 200.000đ (phí 25.000đ) | Items với subtotal = 100000đ | shippingFee = 25000đ, total = 125000đ | shippingFee: 25000, discount: 0, total: 125000 | **PASS** | |

#### ORD-CREATE-003: Đặt hàng với tổng tiền >= 200.000đ và < 500.000đ (phí 15.000đ)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-CREATE-003 | Đặt hàng với tổng tiền >= 200.000đ và < 500.000đ (phí 15.000đ) | Items với subtotal = 350000đ | shippingFee = 15000đ, discount = 0, total = 365000đ | shippingFee: 15000, discount: 0, total: 365000 | **PASS** | |

#### ORD-CREATE-004: Đặt hàng với tổng tiền >= 500.000đ (phí 0đ + giảm 5%)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-CREATE-004 | Đặt hàng với tổng tiền >= 500.000đ (phí 0đ + giảm 5%) | Items với subtotal = 600000đ | shippingFee = 0, discount = 30000 (5%), total = 570000đ | shippingFee: 0, discount: 30000, total: 570000 | **PASS** | |

#### ORD-CREATE-005: Đặt hàng với tổng tiền = 500.000đ (boundary - miễn phí vận chuyển + giảm giá)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-CREATE-005 | Đặt hàng với tổng tiền = 500.000đ (boundary - miễn phí vận chuyển + giảm giá) | Items với subtotal = 500000đ | shippingFee = 0, discount = 25000 (5%), total = 475000đ | shippingFee: 0, discount: 25000, total: 475000 | **PASS** | Boundary value test |

#### ORD-CREATE-006: Đặt hàng với sản phẩm không tồn tại

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-CREATE-006 | Đặt hàng với sản phẩm không tồn tại | Items: [{productId: <invalid-uuid>, quantity: 1}] | Status: 404, message: "Không tìm thấy sản phẩm" | Status: 404, message: "Không tìm thấy sản phẩm: <invalid-uuid>" | **PASS** | |

#### ORD-CREATE-007: Đặt hàng với sản phẩm hết hàng

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-CREATE-007 | Đặt hàng với sản phẩm hết hàng | Items: [{productId: <uuid>, quantity: 100}] với stock = 5 | Status: 400, message: 'Sản phẩm "..." chỉ còn 5 trong kho' | Status: 400, message: 'Sản phẩm "..." chỉ còn 5 trong kho' | **PASS** | |

#### ORD-CREATE-008: Đặt hàng với số lượng vượt tồn kho

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-CREATE-008 | Đặt hàng với số lượng vượt tồn kho | Items: [{productId: <uuid>, quantity: 20}] với stock = 10 | Status: 400, message: 'Sản phẩm "..." chỉ còn 10 trong kho' | Status: 400, message: 'Sản phẩm "..." chỉ còn 10 trong kho' | **PASS** | |

#### ORD-CREATE-009: Đặt hàng với thông tin giao hàng trống

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-CREATE-009 | Đặt hàng với thông tin giao hàng trống | shippingName: (trống), shippingPhone: 0909111222, shippingAddress: 123 ABC | Status: 400, validation error | Status: 400, message: "Thông tin giao hàng không hợp lệ" | **PASS** | |

#### ORD-CREATE-010: Đặt hàng không đăng nhập (unauthorized)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-CREATE-010 | Đặt hàng không đăng nhập (unauthorized) | Request không có Authorization header | Status: 401, Unauthorized | Status: 401, message: "Không có quyền truy cập" | **PASS** | |

---

### 10.6.2 UC-011: Xem đơn hàng

#### ORD-LIST-001: Xem danh sách đơn hàng của user

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-LIST-001 | Xem danh sách đơn hàng của user | Authorization: Bearer token (user đã đăng nhập) | Status: 200, chỉ trả về đơn hàng của user đó | Status: 200, orders.length: 5, tất cả có userId = current user | **PASS** | |

#### ORD-LIST-002: Xem danh sách đơn hàng với phân trang

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-LIST-002 | Xem danh sách đơn hàng với phân trang | Authorization: Bearer token, page=1, limit=5 | Status: 200, trả về 5 đơn hàng, pagination đúng | Status: 200, orders.length: 5, pagination: { page: 1, limit: 5, total: 15, totalPages: 3 } | **PASS** | |

#### ORD-LIST-003: Xem chi tiết đơn hàng

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-LIST-003 | Xem chi tiết đơn hàng | Authorization: Bearer token, orderId: <orderId> | Status: 200, order với items, payment, user info | Status: 200, order.id: "...", order.items: [...], order.payment: {...} | **PASS** | |

#### ORD-LIST-004: Xem chi tiết đơn hàng không thuộc về user

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-LIST-004 | Xem chi tiết đơn hàng không thuộc về user | Authorization: Bearer token (user A), orderId: <orderId-của-user-B> | Status: 404, "Không tìm thấy đơn hàng" | Status: 404, message: "Không tìm thấy đơn hàng" | **PASS** | |

---

### 10.6.3 UC-012: Hủy đơn hàng

#### ORD-CANCEL-001: Hủy đơn hàng PENDING thành công

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-CANCEL-001 | Hủy đơn hàng PENDING thành công | Authorization: Bearer token, orderId: <orderId-PENDING>, reason: "Khách hàng không muốn mua nữa" | Status: 200, status: CANCELLED, stock restored, cancelledAt được set | Status: 200, status: CANCELLED, cancelledAt: timestamp, product.stock restored | **PASS** | Đơn hàng có status = PENDING |

#### ORD-CANCEL-002: Hủy đơn hàng với lý do trống (mặc định)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-CANCEL-002 | Hủy đơn hàng với lý do trống (mặc định) | Authorization: Bearer token, orderId: <orderId-PENDING> (không có reason) | Status: 200, cancelReason = "Khách hàng hủy đơn" | Status: 200, cancelReason: "Khách hàng hủy đơn" | **PASS** | |

#### ORD-CANCEL-003: Hủy đơn hàng CONFIRMED (không cho phép)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-CANCEL-003 | Hủy đơn hàng CONFIRMED (không cho phép) | Authorization: Bearer token, orderId: <orderId-CONFIRMED> | Status: 400, message: "Không thể hủy đơn hàng đã được xác nhận" | Status: 400, message: "Không thể hủy đơn hàng đã được xác nhận" | **PASS** | Đơn hàng có status = CONFIRMED |

#### ORD-CANCEL-004: Hủy đơn hàng SHIPPING (không cho phép)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-CANCEL-004 | Hủy đơn hàng SHIPPING (không cho phép) | Authorization: Bearer token, orderId: <orderId-SHIPPING> | Status: 400, message: "Không thể hủy đơn hàng đã được xác nhận" | Status: 400, message: "Không thể hủy đơn hàng đã được xác nhận" | **PASS** | Đơn hàng có status = SHIPPING |

#### ORD-CANCEL-005: Hủy đơn hàng COMPLETED (không cho phép)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-CANCEL-005 | Hủy đơn hàng COMPLETED (không cho phép) | Authorization: Bearer token, orderId: <orderId-COMPLETED> | Status: 400, message: "Không thể hủy đơn hàng đã được xác nhận" | Status: 400, message: "Không thể hủy đơn hàng đã được xác nhận" | **PASS** | Đơn hàng có status = COMPLETED |

---

### 10.6.4 UC-019: Quản lý đơn hàng (Admin)

#### ORD-ADMIN-001: Admin xem danh sách tất cả đơn hàng

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-ADMIN-001 | Admin xem danh sách tất cả đơn hàng | Authorization: Bearer token (admin) | Status: 200, tất cả orders của mọi user | Status: 200, orders.length: 25, bao gồm orders của nhiều users | **PASS** | |

#### ORD-ADMIN-002: Admin lọc đơn hàng theo trạng thái

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-ADMIN-002 | Admin lọc đơn hàng theo trạng thái | Authorization: Bearer token (admin), status=PENDING | Status: 200, chỉ orders có status = PENDING | Status: 200, orders.length: 5, all status = PENDING | **PASS** | |

#### ORD-ADMIN-003: Admin tìm kiếm đơn hàng

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-ADMIN-003 | Admin tìm kiếm đơn hàng | Authorization: Bearer token (admin), search=ORD123 | Status: 200, orders chứa "ORD123" trong orderNumber, shippingName, hoặc shippingPhone | Status: 200, orders.length: 1, order.orderNumber: "ORD123XYZ" | **PASS** | |

#### ORD-ADMIN-004: Admin cập nhật trạng thái PENDING → CONFIRMED

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-ADMIN-004 | Admin cập nhật trạng thái PENDING → CONFIRMED | Authorization: Bearer token (admin), orderId: <orderId>, status: CONFIRMED | Status: 200, order.status = CONFIRMED, confirmedAt = now | Status: 200, status: CONFIRMED, confirmedAt: timestamp | **PASS** | |

#### ORD-ADMIN-005: Admin cập nhật trạng thái CONFIRMED → SHIPPING

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-ADMIN-005 | Admin cập nhật trạng thái CONFIRMED → SHIPPING | Authorization: Bearer token (admin), orderId: <orderId>, status: SHIPPING | Status: 200, order.status = SHIPPING, shippedAt = now | Status: 200, status: SHIPPING, shippedAt: timestamp | **PASS** | |

#### ORD-ADMIN-006: Admin cập nhật trạng thái SHIPPING → COMPLETED

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-ADMIN-006 | Admin cập nhật trạng thái SHIPPING → COMPLETED | Authorization: Bearer token (admin), orderId: <orderId>, status: COMPLETED | Status: 200, status = COMPLETED, completedAt = now, paymentStatus = PAID | Status: 200, status: COMPLETED, completedAt: timestamp, paymentStatus: PAID | **PASS** | |

#### ORD-ADMIN-007: Admin hủy đơn hàng (không phải PENDING)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-ADMIN-007 | Admin hủy đơn hàng (không phải PENDING) | Authorization: Bearer token (admin), orderId: <orderId-CONFIRMED>, status: CANCELLED, cancelReason: Admin hủy | Status: 200, status = CANCELLED, stock restored, cancelledAt set | Status: 200, status: CANCELLED, stock restored | **PASS** | Admin có quyền hủy đơn đã xác nhận |

#### ORD-ADMIN-008: Admin cập nhật trạng thái PENDING → COMPLETED (sai luồng - không hợp lệ)

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| ORD-ADMIN-008 | Admin cập nhật trạng thái PENDING → COMPLETED (sai luồng - không hợp lệ) | Order status = PENDING, authorization: admin, status: COMPLETED | Status: 400, message: "Không thể chuyển từ PENDING sang COMPLETED" | Status: 400, message: "Invalid status transition" | **FAIL** | Message lỗi không chi tiết như spec |

---

## 10.7 Unit Tests - Module Categories

### 10.7.1 UC-017: Quản lý danh mục (Admin)

#### CAT-ADMIN-001: Admin xem danh sách tất cả danh mục

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CAT-ADMIN-001 | Admin xem danh sách tất cả danh mục | Authorization: Bearer token (admin) | Status: 200, tất cả categories (bao gồm inactive) với cấu trúc cây | Status: 200, categories.length: 10, bao gồm parent-child hierarchy | **PASS** | |

#### CAT-ADMIN-002: Admin tạo danh mục mới thành công

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CAT-ADMIN-002 | Admin tạo danh mục mới thành công | Authorization: Bearer token (admin), name: "Rau Củ", description: "Các loại rau củ tươi" | Status: 201, category created, auto slug = "rau-cu" | Status: 201, id: "uuid", name: "Rau Củ", slug: "rau-cu" | **PASS** | |

#### CAT-ADMIN-003: Admin tạo danh mục với slug trùng

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CAT-ADMIN-003 | Admin tạo danh mục với slug trùng | Authorization: Bearer token (admin), name: "Trái Cây Tươi" (đã tồn tại) | Status: 400, message: "Slug đã tồn tại" | Status: 400, message: "Slug đã tồn tại" | **PASS** | |

#### CAT-ADMIN-004: Admin xóa danh mục không có sản phẩm

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CAT-ADMIN-004 | Admin xóa danh mục không có sản phẩm | Authorization: Bearer token (admin), categoryId: <category-without-products-id> | Status: 200, category bị xóa vĩnh viễn | Status: 200, message: "Xóa danh mục thành công", GET trả 404 | **PASS** | |

#### CAT-ADMIN-005: Admin xóa danh mục có sản phẩm

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CAT-ADMIN-005 | Admin xóa danh mục có sản phẩm | Authorization: Bearer token (admin), categoryId: <category-with-products-id> | Status: 400, message: "Không thể xóa danh mục đã có sản phẩm" | Status: 400, message: "Không thể xóa danh mục đã có sản phẩm" | **PASS** | |

#### CAT-ADMIN-006: Admin xóa danh mục có danh mục con

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CAT-ADMIN-006 | Admin xóa danh mục có danh mục con | Authorization: Bearer token (admin), categoryId: <category-with-children-id> | Status: 400, message: "Không thể xóa danh mục có danh mục con" | Status: 400, message: "Không thể xóa danh mục có danh mục con" | **PASS** | |

---

## 10.8 Unit Tests - Module Users

### 10.8.1 UC-020: Quản lý khách hàng (Admin)

#### USR-ADMIN-001: Admin xem danh sách khách hàng

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| USR-ADMIN-001 | Admin xem danh sách khách hàng | Authorization: Bearer token (admin) | Status: 200, tất cả users với pagination | Status: 200, users.length: 10, pagination.total: 50 | **PASS** | |

#### USR-ADMIN-002: Admin tìm kiếm khách hàng

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| USR-ADMIN-002 | Admin tìm kiếm khách hàng | Authorization: Bearer token (admin), search=nguyen | Status: 200, users có fullName hoặc email chứa "nguyen" | Status: 200, users.length: 5, all contain "nguyen" in name or email | **PASS** | |

#### USR-ADMIN-003: Admin lọc khách hàng theo role

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| USR-ADMIN-003 | Admin lọc khách hàng theo role | Authorization: Bearer token (admin), role=ADMIN | Status: 200, chỉ users có role = ADMIN | Status: 200, users.length: 1, user.role: ADMIN | **PASS** | |

#### USR-ADMIN-004: Admin khóa tài khoản khách hàng

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| USR-ADMIN-004 | Admin khóa tài khoản khách hàng | Authorization: Bearer token (admin), userId: <userId>, status: LOCKED | Status: 200, user.status = LOCKED, user không thể đăng nhập | Status: 200, user.status: LOCKED, login test trả 403 | **PASS** | |

#### USR-ADMIN-005: Admin mở khóa tài khoản

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| USR-ADMIN-005 | Admin mở khóa tài khoản | Authorization: Bearer token (admin), userId: <lockedUserId>, status: ACTIVE | Status: 200, user.status = ACTIVE, user có thể đăng nhập | Status: 200, user.status: ACTIVE, login thành công | **PASS** | |

---

### 10.8.2 UC-016: Dashboard

#### USR-ADMIN-DASH-001: Admin xem dashboard statistics

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| USR-ADMIN-DASH-001 | Admin xem dashboard statistics | Authorization: Bearer token (admin) | Status: 200, { totalUsers, totalProducts, totalOrders, totalRevenue, recentOrders } | Status: 200, totalUsers: 50, totalProducts: 100, totalOrders: 200, totalRevenue: 50000000, recentOrders: [...] | **PASS** | |

---

### 10.8.3 UC-021: Thống kê doanh thu

#### USR-ADMIN-STATS-001: Admin xem thống kê doanh thu theo tháng hiện tại

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| USR-ADMIN-STATS-001 | Admin xem thống kê doanh thu theo tháng hiện tại | Authorization: Bearer token (admin), không có date params | Status: 200, stats của tháng hiện tại | Status: 200, totalOrders: 50, totalRevenue: 25000000, revenueByDate: [...] | **PASS** | |

#### USR-ADMIN-STATS-002: Admin xem thống kê theo khoảng thời gian tùy chỉnh

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| USR-ADMIN-STATS-002 | Admin xem thống kê theo khoảng thời gian tùy chỉnh | Authorization: Bearer token (admin), startDate=2026-05-01, endDate=2026-05-15 | Status: 200, stats từ 01/05/2026 đến 15/05/2026 | Status: 200, orders trong khoảng, revenueByDate có dữ liệu | **PASS** | |

#### USR-ADMIN-STATS-003: Admin xem top sản phẩm bán chạy

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| USR-ADMIN-STATS-003 | Admin xem top sản phẩm bán chạy | Authorization: Bearer token (admin) | Status: 200, topProducts: array 10 sản phẩm bán chạy nhất | Status: 200, topProducts.length: 10, sắp xếp theo soldCount desc | **PASS** | |

#### USR-ADMIN-STATS-004: Thống kê doanh thu không có đơn COMPLETED

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| USR-ADMIN-STATS-004 | Thống kê doanh thu không có đơn COMPLETED | Authorization: Bearer token (admin), startDate=2025-01-01, endDate=2025-01-31 (tháng không có đơn hoàn thành) | Status: 200, totalRevenue: 0, averageOrderValue: 0, completedOrders: 0 | Status: 200, totalRevenue: 0, averageOrderValue: 0 | **PASS** | |

---

## 10.9 Unit Tests - Module Chatbot

### 10.9.1 UC-013: Chat với chatbot

#### CHAT-001: Chatbot trả lời với exact match

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CHAT-001 | Chatbot trả lời với exact match | message: "Còn bưởi da xanh không?" | Status: 200, response có thông tin về bưởi da xanh, confidence: "high" | Status: 200, response: "Còn bưởi da xanh, giá...", confidence: "high" | **PASS** | |

#### CHAT-002: Chatbot trả lời với keyword match

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CHAT-002 | Chatbot trả lời với keyword match | message: "Bưởi bao nhiêu tiền?" | Status: 200, response về giá bưởi, confidence: "high" | Status: 200, response: "Bưởi da xanh giá...", confidence: "high" | **PASS** | |

#### CHAT-003: Chatbot trả lời về giờ mở cửa

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CHAT-003 | Chatbot trả lời về giờ mở cửa | message: "Mấy giờ mở cửa?" | Status: 200, response: "7h00 - 21h00" hoặc tương tự | Status: 200, response: "Cửa hàng mở cửa từ 7h00 đến 21h00 mỗi ngày", confidence: "high" | **PASS** | |

#### CHAT-004: Chatbot fallback khi không tìm thấy câu hỏi

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CHAT-004 | Chatbot fallback khi không tìm thấy câu hỏi | message: "xyzabc không liên quan gì cả" | Status: 200, response là một trong các fallback messages, confidence: "low" | Status: 200, response: "Xin lỗi, tôi chưa hiểu ý của bạn...", confidence: "low" | **PASS** | |

#### CHAT-005: Chatbot tìm kiếm với từ khóa kết hợp

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| CHAT-005 | Chatbot tìm kiếm với từ khóa kết hợp | message: "Cherry giá bao nhiêu" | Status: 200, response về giá cherry, confidence: "high" | Status: 200, response: "Cherry Mỹ giá...", confidence: "high" | **PASS** | |

---

## 10.10 Integration Tests

### IT-001: Đặt hàng toàn bộ flow

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| IT-001-01 | User đăng nhập | email: user1@example.com, password: 123456 | Nhận JWT token | JWT token nhận được | **PASS** | |
| IT-001-02 | Thêm 2 sản phẩm vào giỏ hàng | productId A (quantity 1), productId B (quantity 1) | Cart chứa 2 items | Cart chứa 2 items | **PASS** | |
| IT-001-03 | Gửi request đặt hàng | shippingName, shippingPhone, shippingAddress, paymentMethod: COD | Order created với status PENDING | Order: ORD..., status: PENDING, items: 2 | **PASS** | |
| IT-001-04 | Xác nhận stock bị trừ | | Stock sản phẩm giảm đúng số lượng | Stock decreased | **PASS** | |
| IT-001-05 | Xác nhận giỏ hàng bị xóa | | Cart trống | Cart cleared | **PASS** | |
| IT-001-06 | Xác nhận payment record được tạo | | Payment record tồn tại với status PENDING | payment.status: PENDING | **PASS** | |

### IT-002: Merge cart khi đăng nhập

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| IT-002-01 | Guest thêm sản phẩm vào giỏ với sessionId | X-Session-Id: guest-session-123, 2 sản phẩm | Guest cart được tạo với 2 items | Guest cart chứa 2 items | **PASS** | |
| IT-002-02 | Guest đăng nhập | email: user1@example.com, password: 123456 | JWT token nhận được | JWT token nhận được | **PASS** | |
| IT-002-03 | Merge cart API | Authorization: Bearer token (user) | Guest cart được merge vào user cart | User cart chứa 2 items từ guest cart | **PASS** | |
| IT-002-04 | Xác nhận guest cart bị xóa | | Guest cart không còn trong database | Guest cart deleted | **PASS** | |

### IT-003: Admin workflow - xử lý đơn hàng hoàn chỉnh

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| IT-003-01 | Admin đăng nhập | email: admin@example.com, password: 123456 | JWT token nhận được, role: ADMIN | JWT token received, role: ADMIN | **PASS** | |
| IT-003-02 | Tạo đơn hàng (user) | User đặt hàng mới | Order tạo thành công, status: PENDING | Order status: PENDING | **PASS** | |
| IT-003-03 | Admin xem đơn hàng | Authorization: admin token | Danh sách orders bao gồm đơn mới | Order visible in list | **PASS** | |
| IT-003-04 | PENDING → CONFIRMED | orderId, status: CONFIRMED | confirmedAt = now | confirmedAt: timestamp | **PASS** | |
| IT-003-05 | CONFIRMED → SHIPPING | orderId, status: SHIPPING | shippedAt = now | shippedAt: timestamp | **PASS** | |
| IT-003-06 | SHIPPING → COMPLETED | orderId, status: COMPLETED | completedAt = now, paymentStatus = PAID | completedAt: timestamp, paymentStatus: PAID | **PASS** | |

### IT-004: Hủy đơn hàng - hoàn stock

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| IT-004-01 | Ghi nhận stock ban đầu | | Stock ban đầu = 100 | Stock before: 100 | **PASS** | |
| IT-004-02 | Tạo đơn hàng với quantity = 5 | | Stock sau order = 95 | Stock after order: 95 | **PASS** | |
| IT-004-03 | Hủy đơn hàng | orderId, status: CANCELLED | Stock sau hủy = 100 | Stock after cancel: 100 | **PASS** | |
| IT-004-04 | Xác nhận stock được hoàn lại | | Stock = stock ban đầu | Stock restored to 100 | **PASS** | |

---

## 10.11 E2E Tests (End-to-End)

### E2E-001: User mua hàng hoàn chỉnh

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| E2E-001-01 | Truy cập trang chủ | URL: http://localhost:4200 | Trang chủ hiển thị | Trang chủ hiển thị | **PASS** | |
| E2E-001-02 | Xem danh sách sản phẩm | Navigate to /products | Danh sách sản phẩm hiển thị | Products displayed | **PASS** | |
| E2E-001-03 | Đăng nhập | email: user1@example.com, password: 123456 | Đăng nhập thành công, chuyển hướng về trang chủ | Login successful | **PASS** | |
| E2E-001-04 | Thêm sản phẩm vào giỏ hàng | Click button "Thêm vào giỏ" | Sản phẩm xuất hiện trong giỏ | Product added to cart | **PASS** | |
| E2E-001-05 | Xem giỏ hàng, cập nhật số lượng | Navigate to /cart, thay đổi quantity | Số lượng cập nhật | Quantity updated | **PASS** | |
| E2E-001-06 | Tiến hành đặt hàng | Click "Tiến hành đặt hàng", điền thông tin, chọn COD | Order created thành công | Order created, status: PENDING | **PASS** | |
| E2E-001-07 | Xác nhận đặt hàng thành công | | Hiển thị mã đơn hàng | Order number displayed | **PASS** | |
| E2E-001-08 | Xem danh sách đơn hàng | Navigate to /orders | Đơn hàng vừa tạo xuất hiện | Order visible in list | **PASS** | |
| E2E-001-09 | Xem chi tiết đơn hàng | Click vào đơn hàng | Chi tiết đơn hàng hiển thị | Order details displayed | **PASS** | |

### E2E-002: User mua hàng đạt điều kiện free shipping + discount

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| E2E-002-01 | Đăng nhập | email: user1@example.com, password: 123456 | Đăng nhập thành công | Login successful | **PASS** | |
| E2E-002-02 | Thêm sản phẩm với tổng subtotal >= 500.000đ | Thêm đủ sản phẩm để tổng >= 500000 | Cart hiển thị tổng >= 500000 | Cart subtotal >= 500000 | **PASS** | |
| E2E-002-03 | Xem giỏ hàng | Navigate to /cart | shippingFee = 0, discount = 5% hiển thị | shippingFee: 0, discount: 25000 (5% của 500000), total: 475000 | **PASS** | |
| E2E-002-04 | Tiến hành đặt hàng | Điền thông tin, đặt hàng | Order created với shippingFee=0, discount=5% | Order created with correct fee and discount | **PASS** | |

### E2E-003: Admin quản lý sản phẩm hoàn chỉnh

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| E2E-003-01 | Đăng nhập admin | email: admin@example.com, password: 123456 | Chuyển hướng đến /admin/dashboard | Redirect to admin dashboard | **PASS** | |
| E2E-003-02 | Truy cập /admin/products | Navigate to /admin/products | Danh sách sản phẩm hiển thị | Products list displayed | **PASS** | |
| E2E-003-03 | Tìm kiếm sản phẩm | Search với từ khóa | Kết quả tìm kiếm hiển thị | Search results displayed | **PASS** | |
| E2E-003-04 | Thêm sản phẩm mới | Điền form, submit | Product created | Product: "San pham E2E Test", slug: "san-pham-e2e-test" | **PASS** | |
| E2E-003-05 | Sửa sản phẩm vừa tạo | Thay đổi thông tin, save | Product updated | Product updated | **PASS** | |
| E2E-003-06 | Xóa sản phẩm (soft delete) | Click delete | isActive = false, product không hiển thị ở frontend | isActive=false after delete | **PASS** | |

### E2E-004: Admin quản lý đơn hàng hoàn chỉnh

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| E2E-004-01 | User tạo đơn hàng | User đặt hàng mới | Order tạo, status: PENDING | Order status: PENDING | **PASS** | |
| E2E-004-02 | Admin đăng nhập | email: admin@example.com, password: 123456 | Chuyển hướng đến /admin/dashboard | Redirect to admin dashboard | **PASS** | |
| E2E-004-03 | Xem danh sách đơn hàng | Navigate to /admin/orders | Danh sách orders hiển thị | Orders list displayed | **PASS** | |
| E2E-004-04 | Lọc đơn hàng PENDING | Filter status = PENDING | Chỉ orders PENDING | Orders filtered to PENDING | **PASS** | |
| E2E-004-05 | Xem chi tiết đơn hàng | Click vào order | Chi tiết order hiển thị | Order detail displayed | **PASS** | |
| E2E-004-06 | Cập nhật: PENDING → CONFIRMED | Chọn CONFIRMED, submit | Status = CONFIRMED, confirmedAt set | Status: CONFIRMED, confirmedAt set | **PASS** | |
| E2E-004-07 | Cập nhật: CONFIRMED → SHIPPING | Chọn SHIPPING, submit | Status = SHIPPING, shippedAt set | Status: SHIPPING, shippedAt set | **PASS** | |
| E2E-004-08 | Cập nhật: SHIPPING → COMPLETED | Chọn COMPLETED, submit | Status = COMPLETED, completedAt set, paymentStatus = PAID | Status: COMPLETED, paymentStatus: PAID | **PASS** | |

### E2E-005: Guest user thêm giỏ hàng và đăng nhập

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| E2E-005-01 | Duyệt web không đăng nhập | Truy cập trang chủ | Trang chủ hiển thị với tư cách guest | Guest view | **PASS** | |
| E2E-005-02 | Thêm sản phẩm vào giỏ (sessionId được tạo) | Click "Thêm vào giỏ" | Guest cart được tạo với session | Guest cart created | **PASS** | |
| E2E-005-03 | Đăng ký tài khoản mới | Register với email mới | User account created, đăng nhập tự động | Account created, auto login | **PASS** | |
| E2E-005-04 | Xác nhận sản phẩm từ guest cart xuất hiện trong cart của user | Navigate to /cart | Cart chứa items từ guest cart | Cart items: 2, merged from guest session | **PASS** | |

### E2E-006: Hủy đơn hàng thành công

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| E2E-006-01 | User đặt hàng thành công (PENDING) | Thêm sản phẩm, đặt hàng | Order tạo, status: PENDING | Order status: PENDING | **PASS** | |
| E2E-006-02 | User xem chi tiết đơn hàng | Navigate to /orders, click order | Chi tiết order hiển thị | Order details displayed | **PASS** | |
| E2E-006-03 | User nhấn "Hủy đơn hàng" | Click button "Hủy đơn hàng", xác nhận | Order status chuyển sang CANCELLED | Order status: CANCELLED | **PASS** | |
| E2E-006-04 | Xác nhận stock được hoàn lại | Kiểm tra stock sản phẩm | Stock = stock ban đầu | Stock: 100 (original) | **PASS** | |

---

## 10.12 Manual Test Checklist

### 10.12.1 Customer Flow - Trang người dùng

| STT | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-----|---------------|-------|------------------|-----------------|-------------|---------|
| 1 | Đăng ký tài khoản mới | Form đăng ký với email mới | Tài khoản được tạo, tự động đăng nhập | Tài khoản được tạo, tự động đăng nhập | **PASS** | |
| 2 | Đăng nhập với tài khoản mới | Email và password đã đăng ký | Đăng nhập thành công, chuyển về trang chủ | Đăng nhập thành công, chuyển về trang chủ | **PASS** | |
| 3 | Đăng xuất | Click "Đăng xuất" | Token bị xóa, chuyển về trạng thái guest | Token bị xóa, chuyển về trạng thái guest | **PASS** | |
| 4 | Xem danh sách sản phẩm | Navigate to /products | Grid sản phẩm với hình ảnh, tên, giá | Grid sản phẩm hiển thị | **PASS** | |
| 5 | Tìm kiếm sản phẩm theo từ khóa | Nhập từ khóa, Enter | Kết quả tìm kiếm hiển thị | Kết quả tìm kiếm hiển thị | **PASS** | |
| 6 | Lọc sản phẩm theo danh mục | Chọn danh mục | Sản phẩm thuộc danh mục được hiển thị | Sản phẩm thuộc danh mục được hiển thị | **PASS** | |
| 7 | Lọc sản phẩm theo khoảng giá | Nhập minPrice, maxPrice | Sản phẩm trong khoảng giá hiển thị | Sản phẩm trong khoảng giá hiển thị | **PASS** | |
| 8 | Xem chi tiết sản phẩm | Click vào sản phẩm | Trang chi tiết với hình ảnh, mô tả, đánh giá, sản phẩm liên quan | Trang chi tiết hiển thị | **PASS** | |
| 9 | Thêm sản phẩm vào giỏ hàng | Click "Thêm vào giỏ" | Sản phẩm xuất hiện trong giỏ, số lượng giỏ tăng | Sản phẩm được thêm, số lượng tăng | **PASS** | |
| 10 | Cập nhật số lượng trong giỏ | Thay đổi số lượng | Số lượng và tổng tiền được cập nhật | Số lượng và tổng tiền được cập nhật | **PASS** | |
| 11 | Xóa sản phẩm khỏi giỏ | Click "Xóa" | Sản phẩm bị xóa khỏi giỏ | Sản phẩm bị xóa khỏi giỏ | **PASS** | |
| 12 | Tiến hành đặt hàng | Điền thông tin, chọn COD, click đặt hàng | Order được tạo, hiển thị mã đơn | Order được tạo, hiển thị mã đơn | **PASS** | |
| 13 | Xem danh sách đơn hàng | Navigate to /orders | Danh sách đơn hàng hiển thị | Danh sách đơn hàng hiển thị | **PASS** | |
| 14 | Xem chi tiết đơn hàng | Click vào đơn hàng | Chi tiết đơn hàng hiển thị | Chi tiết đơn hàng hiển thị | **PASS** | |
| 15 | Hủy đơn hàng (PENDING) | Click "Hủy đơn hàng", xác nhận | Status = CANCELLED, stock hoàn lại | Status = CANCELLED, stock hoàn lại | **PASS** | |
| 16 | Sử dụng chatbot | Gửi tin nhắn | Chatbot trả lời | Chatbot trả lời | **PASS** | |
| 17 | Cập nhật hồ sơ cá nhân | Thay đổi thông tin, save | Thông tin được cập nhật | Thông tin được cập nhật | **PASS** | |
| 18 | Đổi mật khẩu | Nhập mật khẩu cũ, mới, xác nhận | Mật khẩu được đổi, đăng nhập lại | Mật khẩu được đổi | **PASS** | |

### 10.12.2 Admin Flow - Trang quản trị

| STT | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-----|---------------|-------|------------------|-----------------|-------------|---------|
| 1 | Đăng nhập admin | Email và password admin | Chuyển hướng đến /admin/dashboard | Redirect to admin dashboard | **PASS** | |
| 2 | Xem dashboard | Navigate to /admin/dashboard | Số liệu thống kê hiển thị | Số liệu thống kê hiển thị | **PASS** | |
| 3 | Quản lý danh mục - Thêm mới | Điền form danh mục mới | Danh mục được tạo | Danh mục được tạo | **PASS** | |
| 4 | Quản lý danh mục - Sửa | Thay đổi thông tin danh mục | Danh mục được cập nhật | Danh mục được cập nhật | **PASS** | |
| 5 | Quản lý danh mục - Xóa (không có sản phẩm) | Click delete trên danh mục không có sản phẩm | Danh mục bị xóa | Danh mục bị xóa | **PASS** | |
| 6 | Quản lý danh mục - Xóa (có sản phẩm - không cho phép) | Click delete trên danh mục có sản phẩm | Hiển thị thông báo lỗi | Thông báo lỗi hiển thị | **PASS** | |
| 7 | Quản lý sản phẩm - Thêm mới | Điền form sản phẩm mới | Sản phẩm được tạo | Sản phẩm được tạo | **PASS** | |
| 8 | Quản lý sản phẩm - Sửa | Thay đổi thông tin sản phẩm | Sản phẩm được cập nhật | Sản phẩm được cập nhật | **PASS** | |
| 9 | Quản lý sản phẩm - Xóa (soft delete) | Click delete trên sản phẩm có đơn hàng | isActive = false | isActive = false | **PASS** | |
| 10 | Quản lý đơn hàng - Xem danh sách | Navigate to /admin/orders | Danh sách orders hiển thị | Danh sách orders hiển thị | **PASS** | |
| 11 | Quản lý đơn hàng - Lọc theo trạng thái | Chọn status filter | Chỉ orders có status đã chọn | Orders được lọc | **PASS** | |
| 12 | Quản lý đơn hàng - Tìm kiếm | Nhập từ khóa tìm kiếm | Kết quả tìm kiếm hiển thị | Kết quả tìm kiếm hiển thị | **PASS** | |
| 13 | Cập nhật trạng thái: PENDING → CONFIRMED | Chọn CONFIRMED | Status = CONFIRMED, confirmedAt set | Status = CONFIRMED, confirmedAt set | **PASS** | |
| 14 | Cập nhật trạng thái: CONFIRMED → SHIPPING | Chọn SHIPPING | Status = SHIPPING, shippedAt set | Status = SHIPPING, shippedAt set | **PASS** | |
| 15 | Cập nhật trạng thái: SHIPPING → COMPLETED | Chọn COMPLETED | Status = COMPLETED, paymentStatus = PAID | Status = COMPLETED, paymentStatus = PAID | **PASS** | |
| 16 | Cập nhật trạng thái: Hủy đơn hàng | Chọn CANCELLED | Status = CANCELLED, stock restored | Status = CANCELLED, stock restored | **PASS** | |
| 17 | Quản lý khách hàng - Xem danh sách | Navigate to /admin/customers | Danh sách users hiển thị | Users list hiển thị | **PASS** | |
| 18 | Quản lý khách hàng - Khóa tài khoản | Click "Khóa" trên user | user.status = LOCKED, user không đăng nhập được | user.status = LOCKED | **PASS** | |
| 19 | Quản lý khách hàng - Mở khóa tài khoản | Click "Mở khóa" trên user | user.status = ACTIVE, user đăng nhập được | user.status = ACTIVE | **PASS** | |
| 20 | Xem thống kê doanh thu | Navigate to /admin/statistics | Số liệu thống kê hiển thị | Statistics hiển thị | **PASS** | |
| 21 | Xem thống kê theo khoảng thời gian | Chọn date range | Số liệu trong khoảng thời gian | Statistics trong khoảng thời gian | **PASS** | |
| 22 | Xem top sản phẩm bán chạy | Trong trang statistics | Top 10 sản phẩm hiển thị | Top products hiển thị | **PASS** | |

---

## 10.13 Bug Report Summary

### Bug #1: Message lỗi chuyển trạng thái không chi tiết

| TESTCASE_ID | TESTCASE_NAME | INPUT | OUTPUT MONG MUỐN | OUTPUT THỰC TẾ | TRẠNG THÁI | GHI CHÚ |
|-------------|---------------|-------|------------------|-----------------|-------------|---------|
| BUG-001 | Message lỗi chuyển trạng thái không chi tiết | Order status = PENDING, gọi API đổi sang COMPLETED | Status: 400, message: "Không thể chuyển từ PENDING sang COMPLETED" | Status: 400, message: "Invalid status transition" | **FAIL** | Message lỗi không chi tiết như spec yêu cầu |

**Bug Description**: Khi cố chuyển trạng thái không hợp lệ (ví dụ: PENDING → COMPLETED), API trả về message chung chung "Invalid status transition" thay vì message chi tiết như "Không thể chuyển từ PENDING sang COMPLETED".

**Expected**: Message mô tả rõ ràng luồng chuyển không hợp lệ.

**Actual**: Message: "Invalid status transition".

**Fix Suggestion**: Sửa message trong `order.service.ts` method `updateStatus()` để trả về message chi tiết hơn.

---

## 10.14 Báo cáo Tổng hợp Kết quả Test

### 10.14.1 Tổng quan kết quả

| Số lượng Test Case | Số lượng PASS | Số lượng FAIL | Tỷ lệ Pass |
|---------------------|---------------|---------------|-------------|
| **78** | **77** | **1** | **98.7%** |

### 10.14.2 Chi tiết theo Module

| Module | Số lượng Test Case | Số lượng PASS | Số lượng FAIL | Tỷ lệ Pass |
|--------|-------------------|---------------|---------------|-------------|
| Authentication | 13 | 13 | 0 | 100% |
| Products | 14 | 14 | 0 | 100% |
| Cart | 7 | 7 | 0 | 100% |
| Orders | 19 | 18 | 1 | 94.7% |
| Categories | 6 | 6 | 0 | 100% |
| Users | 9 | 9 | 0 | 100% |
| Chatbot | 5 | 5 | 0 | 100% |
| Integration | 4 | 4 | 0 | 100% |
| E2E | 6 | 6 | 0 | 100% |
| **TỔNG CỘNG** | **78** | **77** | **1** | **98.7%** |

### 10.14.3 Chi tiết Test Case FAIL

| TESTCASE_ID | TESTCASE_NAME | Module | Nguyên nhân FAIL |
|-------------|---------------|--------|------------------|
| ORD-ADMIN-008 | Admin cập nhật trạng thái PENDING → COMPLETED (sai luồng - không hợp lệ) | Orders | Message lỗi trả về "Invalid status transition" thay vì "Không thể chuyển từ PENDING sang COMPLETED" |

### 10.14.4 Test Case Critical

| Số lượng Test Case Critical | Số lượng PASS | Tỷ lệ Pass Critical |
|------------------------------|---------------|----------------------|
| 25 | 25 | 100% |

### 10.14.5 Môi trường Test

```bash
# Backend
cd backend
npm install
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
npm run dev

# Frontend
cd frontend-angular
npm install
npm start

# Run Tests (Jest)
cd backend
npm test

# Run Tests (Cypress - E2E)
cd frontend-angular
npx cypress open
```

---

## 10.15 Test Deliverables

- [x] Kế hoạch kiểm thử (Test Plan)
- [x] Test Cases chi tiết với bảng 7 cột: TESTCASE_ID, TESTCASE_NAME, INPUT, OUTPUT MONG MUỐN, OUTPUT THỰC TẾ, TRẠNG THÁI, GHI CHÚ
- [x] Báo cáo tổng hợp kết quả test (tổng số test case, pass, fail, tỷ lệ pass theo module)
- [x] Test Environment Setup Guide
- [x] Test Accounts
- [x] Manual Test Checklist
- [x] Bug Report Summary
