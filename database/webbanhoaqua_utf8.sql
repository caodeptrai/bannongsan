-- =====================================================
-- Database: webbanhoaqua
-- Charset: utf8mb4 (Full Vietnamese support)
-- =====================================================
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

DROP DATABASE IF EXISTS webbanhoaqua;
CREATE DATABASE webbanhoaqua 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_vietnamese_ci;
USE webbanhoaqua;
SET NAMES utf8mb4;

-- =====================================================
-- Table: users
-- =====================================================
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `status` ENUM('ACTIVE', 'INACTIVE', 'LOCKED') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- =====================================================
-- Table: categories
-- =====================================================
CREATE TABLE `categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `image` VARCHAR(191) NULL,
    `parentId` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `categories_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- =====================================================
-- Table: products
-- =====================================================
CREATE TABLE `products` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `price` DECIMAL(12, 2) NOT NULL,
    `originalPrice` DECIMAL(12, 2) NULL,
    `unit` VARCHAR(191) NOT NULL DEFAULT 'kg',
    `stock` INTEGER NOT NULL DEFAULT 0,
    `sku` VARCHAR(191) NULL,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `viewCount` INTEGER NOT NULL DEFAULT 0,
    `soldCount` INTEGER NOT NULL DEFAULT 0,
    `rating` DECIMAL(3, 2) NOT NULL DEFAULT 0,
    `reviewCount` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `categoryId` VARCHAR(191) NOT NULL,
    UNIQUE INDEX `products_slug_key`(`slug`),
    UNIQUE INDEX `products_sku_key`(`sku`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- =====================================================
-- Table: product_images
-- =====================================================
CREATE TABLE `product_images` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `altText` VARCHAR(191) NULL,
    `isPrimary` BOOLEAN NOT NULL DEFAULT false,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- =====================================================
-- Table: carts
-- =====================================================
CREATE TABLE `carts` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `sessionId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `carts_userId_key`(`userId`),
    UNIQUE INDEX `carts_sessionId_key`(`sessionId`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- =====================================================
-- Table: cart_items
-- =====================================================
CREATE TABLE `cart_items` (
    `id` VARCHAR(191) NOT NULL,
    `cartId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `cart_items_cartId_productId_key`(`cartId`, `productId`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- =====================================================
-- Table: orders
-- =====================================================
CREATE TABLE `orders` (
    `id` VARCHAR(191) NOT NULL,
    `orderNumber` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `subtotal` DECIMAL(12, 2) NOT NULL,
    `shippingFee` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `discount` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `total` DECIMAL(12, 2) NOT NULL,
    `shippingName` VARCHAR(191) NOT NULL,
    `shippingPhone` VARCHAR(191) NOT NULL,
    `shippingAddress` TEXT NOT NULL,
    `shippingNote` TEXT NULL,
    `paymentMethod` ENUM('COD', 'BANK_TRANSFER', 'MOMO', 'ZALOPAY') NOT NULL DEFAULT 'COD',
    `paymentStatus` ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    `confirmedAt` DATETIME(3) NULL,
    `shippedAt` DATETIME(3) NULL,
    `completedAt` DATETIME(3) NULL,
    `cancelledAt` DATETIME(3) NULL,
    `cancelReason` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `orders_orderNumber_key`(`orderNumber`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- =====================================================
-- Table: order_items
-- =====================================================
CREATE TABLE `order_items` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `productImage` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL,
    `price` DECIMAL(12, 2) NOT NULL,
    `total` DECIMAL(12, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- =====================================================
-- Table: payments
-- =====================================================
CREATE TABLE `payments` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `method` ENUM('COD', 'BANK_TRANSFER', 'MOMO', 'ZALOPAY') NOT NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `status` ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    `transactionId` VARCHAR(191) NULL,
    `paymentData` TEXT NULL,
    `paidAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `payments_orderId_key`(`orderId`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- =====================================================
-- Table: reviews
-- =====================================================
CREATE TABLE `reviews` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `reviews_userId_productId_key`(`userId`, `productId`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- =====================================================
-- Table: chatbot_faqs
-- =====================================================
CREATE TABLE `chatbot_faqs` (
    `id` VARCHAR(191) NOT NULL,
    `question` TEXT NOT NULL,
    `answer` TEXT NOT NULL,
    `keywords` TEXT NULL,
    `category` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `priority` INTEGER NOT NULL DEFAULT 0,
    `productId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- =====================================================
-- Foreign Keys
-- =====================================================
ALTER TABLE `categories` ADD CONSTRAINT `categories_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `products` ADD CONSTRAINT `products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `carts` ADD CONSTRAINT `carts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `carts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `orders` ADD CONSTRAINT `orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `payments` ADD CONSTRAINT `payments_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `chatbot_faqs` ADD CONSTRAINT `chatbot_faqs_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- =====================================================
-- SEED DATA: Users
-- =====================================================
INSERT INTO `users` (`id`, `email`, `password`, `fullName`, `phone`, `address`, `role`, `status`) VALUES
('usr-001', 'admin@webbanhoaqua.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Quan Tri Vien', '0901234567', '123 Duong Admin, Quan 1, TP.HCM', 'ADMIN', 'ACTIVE'),
('usr-002', 'nguyen@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Nguyen Van Nam', '0912345678', '456 Duong Le Loi, Quan 3, TP.HCM', 'USER', 'ACTIVE'),
('usr-003', 'tran@yahoo.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Tran Thi Lan', '0923456789', '789 Duong Nguyen Hue, Quan 1, TP.HCM', 'USER', 'ACTIVE'),
('usr-004', 'le@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Le Hoang Minh', '0934567890', '321 Duong Dien Bien Phu, Quan Binh Thanh, TP.HCM', 'USER', 'ACTIVE'),
('usr-005', 'hoa@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Pham Thi Hoa', '0945678901', '654 Duong Vo Van Tan, Quan 3, TP.HCM', 'USER', 'ACTIVE');

-- =====================================================
-- SEED DATA: Categories
-- =====================================================
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image`, `isActive`, `sortOrder`) VALUES
('cat-001', 'Trai Cay Nhap Khau', 'trai-cay-nhap-khau', 'Cac loai trai cay nhap khau cao cap tu nhieu quoc gia', 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400', true, 1),
('cat-002', 'Trai Cay Viet Nam', 'trai-cay-viet-nam', 'Trai cay tuoi ngon tu vuon Viet Nam', 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400', true, 2),
('cat-003', 'Trai Cay Kho', 'trai-cay-kho', 'Cac loai trai cay say kho, hat dinh duong', 'https://images.unsplash.com/photo-1596272875729-ed2c21ebbbc0?w=400', true, 3),
('cat-004', 'Nuoc Trai Cay', 'nuoc-trai-cay', 'Nuoc ep va nuoc trai cay dong chai', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', true, 4),
('cat-005', 'Qua Tang', 'qua-tang', 'Gio trai cay va hop qua tang cao cap', 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400', true, 5);

-- =====================================================
-- SEED DATA: Products
-- =====================================================
INSERT INTO `products` (`id`, `name`, `slug`, `description`, `price`, `originalPrice`, `unit`, `stock`, `sku`, `isFeatured`, `isActive`, `viewCount`, `soldCount`, `rating`, `reviewCount`, `categoryId`) VALUES
('prd-001', 'Xoai Uc Premium', 'xoai-uc-premium', 'Xoai Uc hao hang, vi ngot dam da, thit vang ong.', 89000.00, 99000.00, 'kg', 150, 'XU-001', true, true, 1250, 85, 4.80, 23, 'cat-001'),
('prd-002', 'Nho Den My', 'nho-den-my', 'Nho den khong hat nhap khau tu My, vi ngot thanh, gion tan.', 159000.00, 179000.00, 'khay 500g', 80, 'NM-002', true, true, 980, 62, 4.75, 18, 'cat-001'),
('prd-003', 'Tao Envy New Zealand', 'tao-envy-nz', 'Tao Envy New Zealand voi vi ngot dam, gion va nhieu nuoc.', 125000.00, 145000.00, 'kg', 100, 'TE-003', true, true, 756, 45, 4.90, 12, 'cat-001'),
('prd-004', 'Cherry Chile', 'cherry-chile', 'Cherry Chile do dam, cang mong, ngot lim.', 189000.00, 219000.00, '500g', 60, 'CC-004', true, true, 654, 38, 4.70, 9, 'cat-001'),
('prd-005', 'Cam Valencia Tay Ban Nha', 'cam-valencia-tbn', 'Cam Valencia Tay Ban Nha nguyen vo, nhieu nuoc, vi ngot thanh.', 75000.00, 85000.00, 'kg', 200, 'CV-005', true, true, 432, 28, 4.60, 7, 'cat-001'),
('prd-006', 'Xoai Cat Hoa Loc', 'xoai-cat-hoa-loc', 'Xoai Cat Hoa Loc noi tieng tu Mien Tay, thit vang dam, ngot died.', 55000.00, NULL, 'kg', 300, 'XC-006', true, true, 1876, 156, 4.85, 42, 'cat-002'),
('prd-007', 'Sau Rieng Ri6', 'sau-rieng-ri6', 'Sau rieng Ri6 Dak Lak, com vang deo, huong vi dam da.', 135000.00, NULL, 'kg', 120, 'SR-007', true, true, 2345, 198, 4.95, 67, 'cat-002'),
('prd-008', 'Vu Sua Lo Ren', 'vu-sua-lo-ren', 'Vu sua Lo Ren Vinh Long noi tieng, vo mong, thit trang ngan.', 45000.00, NULL, 'kg', 180, 'VS-008', true, true, 1123, 89, 4.70, 25, 'cat-002'),
('prd-009', 'Thanh Long Binh Thuan', 'thanh-long-bt', 'Thanh long Binh Thuan ru do tham, gion ngot, giau vitamin.', 28000.00, NULL, 'kg', 400, 'TL-009', false, true, 543, 67, 4.50, 15, 'cat-002'),
('prd-010', 'Buoi Nam Roi Dong Thap', 'buoi-nam-roi', 'Buoi Nam Roi Dong Thap vo mong, cui trang, it xo.', 35000.00, NULL, 'quả', 250, 'BN-010', false, true, 678, 45, 4.65, 12, 'cat-002'),
('prd-011', 'Nhan Long Dong Daek', 'nhan-long-dong-daek', 'Nhan Long Dong Daek Dak Nong, qua to, com day, ngot dam.', 38000.00, NULL, 'kg', 150, 'NL-011', false, true, 432, 34, 4.55, 8, 'cat-002'),
('prd-012', 'Vai Thieu Thanh Ha', 'vai-thieu-thanh-ha', 'Vai Thieu Thanh Ha Hai Duong noi tieng, ngot thom, hat nho.', 32000.00, NULL, 'kg', 200, 'VT-012', false, true, 890, 78, 4.80, 22, 'cat-002'),
('prd-013', 'Mit Say Gion', 'mit-say-gion', 'Mit say gion tu Nam Bo, 100% tu nhien, khong chat bao quan.', 85000.00, 95000.00, 'tui 200g', 100, 'MSG-013', true, true, 567, 34, 4.60, 9, 'cat-003'),
('prd-014', 'Xoai Say Deo', 'xoai-say-deo', 'Xoai say deo Dak Lak, vi ngot tu nhien, mem dai.', 72000.00, NULL, 'tui 250g', 120, 'XSD-014', false, true, 345, 23, 4.45, 6, 'cat-003'),
('prd-015', 'Hat Dieu Rang Muoi', 'hat-dieu-rang-muoi', 'Hat dieu rang muoi Binh Phuoc, rang gion, vi dam da.', 145000.00, 165000.00, 'goi 500g', 80, 'HDM-015', true, true, 789, 56, 4.75, 14, 'cat-003'),
('prd-016', 'Hat Macca Uc', 'hat-macca-uc', 'Hat macca rang nhe nhap khau tu Uc, gion thom, giau dinh duong.', 225000.00, 250000.00, 'goi 300g', 50, 'HMU-016', true, true, 456, 28, 4.85, 7, 'cat-003'),
('prd-017', 'Nuoc Ep Cam Vang', 'nuoc-ep-cam-vang', 'Nuoc ep cam nguyen chat 100%, khong duong, khong chat bao quan.', 55000.00, NULL, 'chai 1L', 200, 'NEC-017', true, true, 876, 78, 4.70, 21, 'cat-004'),
('prd-018', 'Nuoc Ep Nho Do', 'nuoc-ep-nho-do', 'Nuoc ep nho do nhap khau, nguyen chat, giau resveratrol.', 89000.00, 99000.00, 'chai 750ml', 100, 'NEN-018', false, true, 345, 23, 4.55, 6, 'cat-004'),
('prd-019', 'Sua Hat Dieu', 'sua-hat-dieu', 'Sua hat dieu 100% tu nhien, khong duong, thuan chay.', 125000.00, NULL, 'chai 1L', 60, 'SHD-019', true, true, 234, 15, 4.60, 4, 'cat-004'),
('prd-020', 'Gio Trai Cay Cao Cap', 'gio-trai-cay-cao-cap', 'Gio trai cay cao cap voi 8-10 loai trai cay nhap khau va Viet Nam.', 890000.00, 999000.00, 'gio', 30, 'GTC-020', true, true, 567, 12, 4.90, 8, 'cat-005'),
('prd-021', 'Hop Qua Trai Cay Mix', 'hop-qua-trai-cay-mix', 'Hop qua trai cay mix voi 5-6 loai trai cay dac san.', 550000.00, 620000.00, 'hop', 50, 'HQT-021', true, true, 432, 18, 4.80, 5, 'cat-005'),
('prd-022', 'Gio Trai Cay Viet Nam', 'gio-trai-cay-vn', 'Gio trai cay Viet Nam cao cap voi cac loai trai cay dac san.', 450000.00, 520000.00, 'gio', 40, 'GTV-022', false, true, 234, 9, 4.65, 3, 'cat-005');

-- =====================================================
-- SEED DATA: Product Images
-- =====================================================
INSERT INTO `product_images` (`id`, `productId`, `url`, `altText`, `isPrimary`, `sortOrder`) VALUES
('img-001', 'prd-001', 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=800', 'Xoai Uc Premium', true, 1),
('img-002', 'prd-001', 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800', 'Xoai Uc cat lat', false, 2),
('img-003', 'prd-002', 'https://images.unsplash.com/photo-1568702846914-96b305d2ebb1?w=800', 'Nho Den My', true, 1),
('img-004', 'prd-003', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800', 'Tao Envy New Zealand', true, 1),
('img-005', 'prd-004', 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=800', 'Cherry Chile', true, 1),
('img-006', 'prd-005', 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800', 'Cam Valencia Tay Ban Nha', true, 1),
('img-007', 'prd-006', 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=800', 'Xoai Cat Hoa Loc', true, 1),
('img-008', 'prd-006', 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800', 'Xoai Cat Hoa Loc chin', false, 2),
('img-009', 'prd-007', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800', 'Sau Rieng Ri6', true, 1),
('img-010', 'prd-008', 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800', 'Vu Sua Lo Ren', true, 1),
('img-011', 'prd-009', 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800', 'Thanh Long Binh Thuan', true, 1),
('img-012', 'prd-010', 'https://images.unsplash.com/photo-1596431707056-3d44c6bb7b15?w=800', 'Buoi Nam Roi', true, 1),
('img-013', 'prd-013', 'https://images.unsplash.com/photo-1596272875729-ed2c21ebbbc0?w=800', 'Mit Say Gion', true, 1),
('img-014', 'prd-015', 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800', 'Hat Dieu Rang Muoi', true, 1),
('img-015', 'prd-017', 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800', 'Nuoc Ep Cam Vang', true, 1),
('img-016', 'prd-020', 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800', 'Gio Trai Cay Cao Cap', true, 1),
('img-017', 'prd-020', 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800', 'Gio Trai Cay Chi Tiet', false, 2);

-- =====================================================
-- SEED DATA: Orders
-- =====================================================
INSERT INTO `orders` (`id`, `orderNumber`, `userId`, `status`, `subtotal`, `shippingFee`, `discount`, `total`, `shippingName`, `shippingPhone`, `shippingAddress`, `shippingNote`, `paymentMethod`, `paymentStatus`, `confirmedAt`, `shippedAt`, `completedAt`) VALUES
('ord-001', 'ORD-20260501-001', 'usr-002', 'COMPLETED', 435000.00, 0.00, 21750.00, 413250.00, 'Nguyen Van Nam', '0912345678', '456 Duong Le Loi, Quan 3, TP.HCM', 'Giao gio hanh chinh', 'COD', 'PAID', '2026-05-01 10:30:00', '2026-05-02 09:00:00', '2026-05-03 15:30:00'),
('ord-002', 'ORD-20260502-001', 'usr-003', 'COMPLETED', 278000.00, 0.00, 13900.00, 264100.00, 'Tran Thi Lan', '0923456789', '789 Duong Nguyen Hue, Quan 1, TP.HCM', NULL, 'COD', 'PAID', '2026-05-02 14:15:00', '2026-05-03 10:30:00', '2026-05-04 16:00:00'),
('ord-003', 'ORD-20260503-001', 'usr-004', 'CONFIRMED', 890000.00, 0.00, 44500.00, 845500.00, 'Le Hoang Minh', '0934567890', '321 Duong Dien Bien Phu, Quan Binh Thanh, TP.HCM', 'Goi dien truoc khi giao', 'BANK_TRANSFER', 'PAID', '2026-05-03 16:45:00', NULL, NULL),
('ord-004', 'ORD-20260504-001', 'usr-002', 'SHIPPING', 189000.00, 0.00, 9450.00, 179550.00, 'Nguyen Van Nam', '0912345678', '456 Duong Le Loi, Quan 3, TP.HCM', NULL, 'COD', 'PENDING', '2026-05-04 11:20:00', '2026-05-05 08:30:00', NULL),
('ord-005', 'ORD-20260505-001', 'usr-005', 'PENDING', 315000.00, 0.00, 15750.00, 299250.00, 'Pham Thi Hoa', '0945678901', '654 Duong Vo Van Tan, Quan 3, TP.HCM', 'De cua chinh', 'COD', 'PENDING', NULL, NULL, NULL),
('ord-006', 'ORD-20260505-002', 'usr-003', 'CANCELLED', 55000.00, 25000.00, 0.00, 80000.00, 'Tran Thi Lan', '0923456789', '789 Duong Nguyen Hue, Quan 1, TP.HCM', 'Khach huy don', 'COD', 'FAILED', NULL, NULL, '2026-05-05 18:00:00');

-- =====================================================
-- SEED DATA: Order Items
-- =====================================================
INSERT INTO `order_items` (`id`, `orderId`, `productId`, `productName`, `productImage`, `quantity`, `price`, `total`) VALUES
('oi-001', 'ord-001', 'prd-007', 'Sau Rieng Ri6', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400', 2, 135000.00, 270000.00),
('oi-002', 'ord-001', 'prd-006', 'Xoai Cat Hoa Loc', 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=400', 3, 55000.00, 165000.00),
('oi-003', 'ord-002', 'prd-001', 'Xoai Uc Premium', 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=400', 2, 89000.00, 178000.00),
('oi-004', 'ord-002', 'prd-015', 'Hat Dieu Rang Muoi', 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400', 1, 145000.00, 145000.00),
('oi-005', 'ord-003', 'prd-020', 'Gio Trai Cay Cao Cap', 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400', 1, 890000.00, 890000.00),
('oi-006', 'ord-004', 'prd-004', 'Cherry Chile', 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=400', 1, 189000.00, 189000.00),
('oi-007', 'ord-005', 'prd-017', 'Nuoc Ep Cam Vang', 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400', 3, 55000.00, 165000.00),
('oi-008', 'ord-005', 'prd-015', 'Hat Dieu Rang Muoi', 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400', 1, 145000.00, 145000.00),
('oi-009', 'ord-006', 'prd-017', 'Nuoc Ep Cam Vang', 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400', 1, 55000.00, 55000.00);

-- =====================================================
-- SEED DATA: Payments
-- =====================================================
INSERT INTO `payments` (`id`, `orderId`, `method`, `amount`, `status`, `transactionId`, `paidAt`) VALUES
('pay-001', 'ord-001', 'COD', 413250.00, 'PAID', NULL, '2026-05-03 15:30:00'),
('pay-002', 'ord-002', 'COD', 264100.00, 'PAID', NULL, '2026-05-04 16:00:00'),
('pay-003', 'ord-003', 'BANK_TRANSFER', 845500.00, 'PAID', 'TXN2026050312345', '2026-05-03 17:00:00'),
('pay-004', 'ord-004', 'COD', 179550.00, 'PENDING', NULL, NULL),
('pay-005', 'ord-005', 'COD', 299250.00, 'PENDING', NULL, NULL),
('pay-006', 'ord-006', 'COD', 80000.00, 'FAILED', NULL, NULL);

-- =====================================================
-- SEED DATA: Reviews
-- =====================================================
INSERT INTO `reviews` (`id`, `userId`, `productId`, `rating`, `comment`) VALUES
('rev-001', 'usr-002', 'prd-001', 5, 'Xoai Uc rat ngon, chin deu, ngot dam. Se ung ho tiep!'),
('rev-002', 'usr-003', 'prd-001', 4, 'Xoai ngon nhung giao hoi tre mot ngay.'),
('rev-003', 'usr-002', 'prd-006', 5, 'Xoai Cat Hoa Loc tuoi roi, ngot lim. Dung hang Mien Tay!'),
('rev-004', 'usr-004', 'prd-007', 5, 'Sau rieng Ri6 com vang deo, ngon tuyet! An la me.'),
('rev-005', 'usr-005', 'prd-007', 5, 'Mua 2 qua deu ngon, khong that vong.'),
('rev-006', 'usr-003', 'prd-015', 4, 'Hat dieu rang gion, vua mieng. Dong goi dep.'),
('rev-007', 'usr-002', 'prd-017', 5, 'Nuoc ep cam nguyen chat, uong rat thom.'),
('rev-008', 'usr-004', 'prd-020', 5, 'Gio trai cay dep, sang trong. Giao dung hen.');

-- =====================================================
-- SEED DATA: Chatbot FAQs
-- =====================================================
INSERT INTO `chatbot_faqs` (`id`, `question`, `answer`, `keywords`, `category`, `isActive`, `priority`) VALUES
('faq-001', 'Cua hang co giao hang khong?', 'Co, chung toi giao hang toan quoc. Noi thanh TP.HCM giao trong 24h, cac tinh khac 2-5 ngay tuy khoang cach.', 'giao hang, van chuyen, ship', 'vanchuyen', true, 10),
('faq-002', 'Phi ship bao nhieu?', 'Phi giao hang: Don tu 500.000d: MIEN PHI. Don tu 200.000d - duoi 500.000d: 15.000d. Don duoi 200.000d: 25.000d.', 'phi ship, phi giao, chi phi', 'vanchuyen', true, 9),
('faq-003', 'Thanh toan nhu the nao?', 'Chung toi ho tro: COD (thanh toan khi nhan hang), Chuyen khoan ngan hang, Vi MoMo, Vi ZaloPay.', 'thanh toan, tra tien, COD, chuyen khoan', 'thanhtoan', true, 8),
('faq-004', 'Lam sao de dat hang?', 'Ban co the dat hang qua: 1. Website: Chon san pham -> Them vao gio -> Dat hang. 2. Hotline: 0901 234 567. 3. Zalo: 0901 234 567.', 'dat hang, mua, order', 'muahang', true, 7),
('faq-005', 'San pham co bao hanh khong?', 'Voi trai cay tuoi, chung toi cam ket hoan tien 100% neu san pham khong dung chat luong. Vui long lien he hotline trong vong 24h ke tu khi nhan hang.', 'bao hanh, hoan tien, doi tra', 'baohanh', true, 6),
('faq-006', 'Gio mo cua?', 'Cua hang mo cua tu 7:00 sang den 9:00 toi, thu 2 den CN (ca ngay le).', 'gio mo cua, gio lam viec, thoi gian', 'lienhe', true, 5),
('faq-007', 'Toi muon lien he?', 'Hotline: 0901 234 567 (7:00-21:00). Email: contact@webbanhoaqua.com. Zalo: 0901 234 567. Dia chi: 123 Duong ABC, Quan 1, TP.HCM.', 'lien he, hotline, so dien thoai, email', 'lienhe', true, 4),
('faq-008', 'Co chuong trinh khuyen mai khong?', 'Chung toi co nhieu uu dai: Giam 5% don tu 500.000d. Mien phi ship don tu 500.000d. Thuong xuyen co flash sale vao cac ngay cuoi tuan.', 'khuyen mai, giam gia, uu dai, sale', 'khuyenmai', true, 3),
('faq-009', 'Trai cay co tuoi khong?', 'Tat ca trai cay tai WebBanhHoaqua duoc nhap hang moi moi ngay, bao quan trong kho lanh dat chuan.', 'tuoi, chat luong, tuoi ngon', 'sanpham', true, 2),
('faq-010', 'Co ho tro doi tra khong?', 'Co, chung toi ho tro doi tra trong cac truong hop: San pham hu hong do van chuyen, San pham khong dung nhu mo ta. Vui long gui hinh anh va lien he hotline trong vong 24h.', 'doi tra, tra hang, hoan tien', 'baohanh', true, 1);
