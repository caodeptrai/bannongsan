# 11. Hướng Dẫn Triển Khai

## 11.1 Yêu cầu hệ thống

### Server Requirements
- **OS**: Windows 10/11, Linux (Ubuntu 20.04+), macOS
- **Node.js**: v18.x hoặc cao hơn
- **MySQL**: 8.0 hoặc cao hơn
- **RAM**: Tối thiểu 4GB
- **Disk**: Tối thiểu 10GB trống

### Client Requirements
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Network**: Kết nối internet (để tải Angular bundle)

## 11.2 Cài đặt MySQL

### Windows (Using XAMPP/WAMP)
1. Download XAMPP từ https://www.apachefriends.org/
2. Cài đặt và chạy Apache, MySQL
3. Mở phpMyAdmin (http://localhost/phpmyadmin)
4. Tạo database mới:
```sql
CREATE DATABASE webbanhoaqua CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Linux (Ubuntu)
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql
CREATE DATABASE webbanhoaqua CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### macOS
```bash
brew install mysql
brew services start mysql
mysql -u root -p
CREATE DATABASE webbanhoaqua CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 11.3 Cài đặt Backend

### 1. Clone/Download Project
```bash
cd D:/Project/Webbanhoaqua/backend
```

### 2. Cài đặt Dependencies
```bash
npm install
```

### 3. Cấu hình Environment
Mở file `.env` và chỉnh sửa:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="mysql://root:@localhost:3306/webbanhoaqua"
JWT_SECRET=banhoaqua_jwt_secret_key_2026_very_secure
JWT_EXPIRES_IN=7d
UPLOAD_DIR=uploads
```

**Lưu ý**: Nếu MySQL có password, sửa:
```
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/webbanhoaqua"
```

### 4. Generate Prisma Client
```bash
npm run prisma:generate
```

### 5. Tạo Database Tables (Migration)
```bash
npm run prisma:push
```
Hoặc dùng migrate:
```bash
npm run prisma:migrate
# Chọn name: init
# Chọn Yes để apply
```

### 6. Seed Database (Tạo dữ liệu mẫu)
```bash
npm run prisma:seed
```

### 7. Chạy Backend
```bash
# Development mode (auto-reload)
npm run dev

# Hoặc production build
npm run build
npm start
```

Backend sẽ chạy tại: **http://localhost:5000**

## 11.4 Cài đặt Frontend

### 1. Mở Terminal mới
```bash
cd D:/Project/Webbanhoaqua/frontend-angular
```

### 2. Cài đặt Dependencies
```bash
npm install
```

### 3. Cấu hình Environment
Kiểm tra file `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',
};
```

### 4. Chạy Frontend
```bash
npm start
```

Frontend sẽ chạy tại: **http://localhost:4200**

## 11.5 Kiểm tra hoạt động

### Backend Health Check
Truy cập: http://localhost:5000/api/health
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2026-04-12T00:00:00.000Z"
}
```

### Frontend
1. Mở trình duyệt: http://localhost:4200
2. Kiểm tra trang chủ hiển thị
3. Kiểm tra API kết nối

## 11.6 Troubleshooting

### Lỗi "Cannot connect to MySQL"
1. Kiểm tra MySQL đang chạy: `sudo systemctl status mysql`
2. Kiểm tra thông tin kết nối trong `.env`
3. Kiểm tra user/password MySQL

### Lỗi "Prisma Client not found"
```bash
npm run prisma:generate
```

### Lỗi "Port already in use"
Thay đổi port trong `.env`:
```env
PORT=5001
```

### Lỗi CORS
Kiểm tra file `src/index.ts` backend có cấu hình CORS đúng:
```typescript
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:4201'],
  credentials: true,
}));
```

### Build Angular lỗi
```bash
rm -rf node_modules dist
npm install
npm start
```

## 11.7 Production Deployment

### Build Production
```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend-angular
npm run build
```

### Các bước deploy lên Server

1. **Database**: Đảm bảo MySQL được cài đặt và chạy
2. **Backend**: Build và chạy với process manager (PM2)
```bash
npm install -g pm2
pm2 start npm --name "backend" -- start
```
3. **Frontend**: Build production và cấu hình web server (Nginx/Apache)

### Nginx Config Example
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend (Static files)
    location / {
        root /path/to/frontend-angular/dist/webbanhoaqua;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 11.8 Database Reset

Nếu cần reset database:
```bash
cd backend
npx prisma migrate reset
# Gõ "y" để xác nhận
npm run prisma:seed
```

## 11.9 Environment Variables Production

```env
# Production
NODE_ENV=production
PORT=5000
DATABASE_URL="mysql://user:password@host:3306/webbanhoaqua"
JWT_SECRET=YOUR_VERY_LONG_SECURE_SECRET_KEY
JWT_EXPIRES_IN=7d
```

## 11.10 Backup Database

```bash
mysqldump -u root -p webbanhoaqua > backup_$(date +%Y%m%d).sql
```

## 11.11 Restore Database

```bash
mysql -u root -p webbanhoaqua < backup_20260412.sql
```
