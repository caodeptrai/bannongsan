-- =====================================================
-- Database: webbanhoaqua
-- Created: 2026-05-29
-- =====================================================

-- Create Database
DROP DATABASE IF EXISTS webbanhoaqua;
CREATE DATABASE webbanhoaqua CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci;
USE webbanhoaqua;

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
    `updatedAt` DATETIME(3) NOT NULL,
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
    `updatedAt` DATETIME(3) NOT NULL,
    UNIQUE INDEX `categories_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
    `updatedAt` DATETIME(3) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    UNIQUE INDEX `products_slug_key`(`slug`),
    UNIQUE INDEX `products_sku_key`(`sku`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: carts
-- =====================================================
CREATE TABLE `carts` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `sessionId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    UNIQUE INDEX `carts_userId_key`(`userId`),
    UNIQUE INDEX `carts_sessionId_key`(`sessionId`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: cart_items
-- =====================================================
CREATE TABLE `cart_items` (
    `id` VARCHAR(191) NOT NULL,
    `cartId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    UNIQUE INDEX `cart_items_cartId_productId_key`(`cartId`, `productId`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
    `updatedAt` DATETIME(3) NOT NULL,
    UNIQUE INDEX `orders_orderNumber_key`(`orderNumber`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
    `updatedAt` DATETIME(3) NOT NULL,
    UNIQUE INDEX `payments_orderId_key`(`orderId`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
    `updatedAt` DATETIME(3) NOT NULL,
    UNIQUE INDEX `reviews_userId_productId_key`(`userId`, `productId`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `chatbot_faqs` ADD CONSTRAINT `chatbot_faqs_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- =====================================================
-- SEED DATA: Users
-- Password for all users is: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy (123456)
-- =====================================================
INSERT INTO `users` (`id`, `email`, `password`, `fullName`, `phone`, `address`, `role`, `status`) VALUES
('usr-001', 'admin@webbanhoaqua.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Quản Trị Viên', '0901234567', '123 Đường Admin, Quận 1, TP.HCM', 'ADMIN', 'ACTIVE'),
('usr-002', 'nguyen@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Nguyễn Văn Nam', '0912345678', '456 Đường Lê Lợi, Quận 3, TP.HCM', 'USER', 'ACTIVE'),
('usr-003', 'tran@yahoo.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Trần Thị Lan', '0923456789', '789 Đường Nguyễn Huệ, Quận 1, TP.HCM', 'USER', 'ACTIVE'),
('usr-004', 'le@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Lê Hoàng Minh', '0934567890', '321 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM', 'USER', 'ACTIVE'),
('usr-005', 'hoa@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Phạm Thị Hòa', '0945678901', '654 Đường Võ Văn Tần, Quận 3, TP.HCM', 'USER', 'ACTIVE');

-- =====================================================
-- SEED DATA: Categories
-- =====================================================
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image`, `isActive`, `sortOrder`) VALUES
('cat-001', 'Trái Cây Nhập Khẩu', 'trai-cay-nhap-khau', 'Các loại trái cây nhập khẩu cao cấp từ nhiều quốc gia', 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400', true, 1),
('cat-002', 'Trái Cây Việt Nam', 'trai-cay-viet-nam', 'Trái cây tươi ngon từ vườn Việt Nam', 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400', true, 2),
('cat-003', 'Trái Cây Khô', 'trai-cay-kho', 'Các loại trái cây sấy khô, hạt dinh dưỡng', 'https://images.unsplash.com/photo-1596272875729-ed2c21ebbbc0?w=400', true, 3),
('cat-004', 'Nước Trái Cây', 'nuoc-trai-cay', 'Nước ép và nước trái cây đóng chai', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', true, 4),
('cat-005', 'Quà Tặng', 'qua-tang', 'Giỏ trái cây và hộp quà tặng cao cấp', 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400', true, 5);

-- =====================================================
-- SEED DATA: Products
-- =====================================================
INSERT INTO `products` (`id`, `name`, `slug`, `description`, `price`, `originalPrice`, `unit`, `stock`, `sku`, `isFeatured`, `isActive`, `viewCount`, `soldCount`, `rating`, `reviewCount`, `categoryId`) VALUES
-- Nhập khẩu
('prd-001', 'Xoài Úc Premium', 'xoai-uc-premium', 'Xoài Úc hảo hạng, vị ngọt đậm đà, thịt vàng óng. Được nhập khẩu trực tiếp từ Australia, đảm bảo chất lượng tươi ngon nhất.', 89000.00, 99000.00, 'kg', 150, 'XU-001', true, true, 1250, 85, 4.80, 23, 'cat-001'),
('prd-002', 'Nho Đen Mỹ', 'nho-den-my', 'Nho đen không hạt nhập khẩu từ Mỹ, vị ngọt thanh, giòn tan. Đóng gói khay 500g tiện lợi.', 159000.00, 179000.00, 'khay 500g', 80, 'NM-002', true, true, 980, 62, 4.75, 18, 'cat-001'),
('prd-003', 'Táo Envy New Zealand', 'tao-envy-nz', 'Táo Envy New Zealand với vị ngọt đậm, giòn và nhiều nước. Đặc biệt không bắt đầu xứng nhanh.', 125000.00, 145000.00, 'kg', 100, 'TE-003', true, true, 756, 45, 4.90, 12, 'cat-001'),
('prd-004', 'Cherry Chile', 'cherry-chile', 'Cherry Chile đỏ đậm, căng mọng, ngọt lịm. Nhập khẩu trực tiếp từ Chile.', 189000.00, 219000.00, '500g', 60, 'CC-004', true, true, 654, 38, 4.70, 9, 'cat-001'),
('prd-005', 'Cam Valencia Tây Ban Nha', 'cam-valencia-tbn', 'Cam Valencia Tây Ban Nha nguyên vỏ, nhiều nước, vị ngọt thanh. Đóng gói túi 1kg.', 75000.00, 85000.00, 'kg', 200, 'CV-005', true, true, 432, 28, 4.60, 7, 'cat-001'),

-- Việt Nam
('prd-006', 'Xoài Cát Hòa Lộc', 'xoai-cat-hoa-loc', 'Xoài Cát Hòa Lộc nổi tiếng từ Miền Tây, thịt vàng đậm, ngọt dịu, thơm ngon.', 55000.00, NULL, 'kg', 300, 'XC-006', true, true, 1876, 156, 4.85, 42, 'cat-002'),
('prd-007', 'Sầu Riêng Ri6', 'sau-rieng-ri6', 'Sầu riêng Ri6 Đắk Lắk, cơm vàng dẻo, hương vị đậm đà, ngọt lịm.', 135000.00, NULL, 'kg', 120, 'SR-007', true, true, 2345, 198, 4.95, 67, 'cat-002'),
('prd-008', 'Vú Sữa Lò Rèn', 'vu-sua-lo-ren', 'Vú sữa Lò Rèn Vĩnh Long nổi tiếng, vỏ mỏng, thịt trắng ngần, nhiều nước.', 45000.00, NULL, 'kg', 180, 'VS-008', true, true, 1123, 89, 4.70, 25, 'cat-002'),
('prd-009', 'Thanh Long Bình Thuận', 'thanh-long-bt', 'Thanh long Bình Thuận ruột đỏ thắm, giòn ngọt, giàu vitamin.', 28000.00, NULL, 'kg', 400, 'TL-009', false, true, 543, 67, 4.50, 15, 'cat-002'),
('prd-010', 'Bưởi Năm Roi Đồng Tháp', 'buoi-nam-roi', 'Bưởi Năm Roi Đồng Tháp vỏ mỏng, cùi trắng, ít xơ, ngọt thanh.', 35000.00, NULL, 'quả', 250, 'BN-010', false, true, 678, 45, 4.65, 12, 'cat-002'),
('prd-011', 'Nhãn Long Đồng Daek', 'nhan-long-dong-daek', 'Nhãn Long Đồng Daek Đắk Nông, quả to, cơm dày, ngọt đậm.', 38000.00, NULL, 'kg', 150, 'NL-011', false, true, 432, 34, 4.55, 8, 'cat-002'),
('prd-012', 'Vải Thiều Thanh Hà', 'vai-thieu-thanh-ha', 'Vải Thiều Thanh Hà Hải Dương nổi tiếng, ngọt thơm, hạt nhỏ.', 32000.00, NULL, 'kg', 200, 'VT-012', false, true, 890, 78, 4.80, 22, 'cat-002'),

-- Khô
('prd-013', 'Mít Sấy Giòn', 'mit-say-gion', 'Mít sấy giòn từ Nam Bộ, 100% tự nhiên, không chất bảo quản. Đóng gói túi 200g.', 85000.00, 95000.00, 'túi 200g', 100, 'MSG-013', true, true, 567, 34, 4.60, 9, 'cat-003'),
('prd-014', 'Xoài Sấy Dẻo', 'xoai-say-deo', 'Xoài sấy dẻo Đắk Lắk, vị ngọt tự nhiên, mềm dai thơm ngon. Túi 250g.', 72000.00, NULL, 'túi 250g', 120, 'XSD-014', false, true, 345, 23, 4.45, 6, 'cat-003'),
('prd-015', 'Hạt Điều Rang Muối', 'hat-dieu-rang-muoi', 'Hạt điều rang muối Bình Phước, rang giòn, vị đậm đà. Gói 500g.', 145000.00, 165000.00, 'gói 500g', 80, 'HDM-015', true, true, 789, 56, 4.75, 14, 'cat-003'),
('prd-016', 'Hạt Macca Úc', 'hat-macca-uc', 'Hạt macca rang nhẹ nhập khẩu từ Úc, giòn thơm, giàu dinh dưỡng. Gói 300g.', 225000.00, 250000.00, 'gói 300g', 50, 'HMU-016', true, true, 456, 28, 4.85, 7, 'cat-003'),

-- Nước
('prd-017', 'Nước Ép Cam Vàng', 'nuoc-ep-cam-vang', 'Nước ép cam nguyên chất 100%, không đường, không chất bảo quản. Chai 1L.', 55000.00, NULL, 'chai 1L', 200, 'NEC-017', true, true, 876, 78, 4.70, 21, 'cat-004'),
('prd-018', 'Nước Ép Nho Đỏ', 'nuoc-ep-nho-do', 'Nước ép nho đỏ nhập khẩu, nguyên chất, giàu resveratrol. Chai 750ml.', 89000.00, 99000.00, 'chai 750ml', 100, 'NEN-018', false, true, 345, 23, 4.55, 6, 'cat-004'),
('prd-019', 'Sữa Hạt Điều', 'sua-hat-dieu', 'Sữa hạt điều 100% tự nhiên, không đường, thuần chay. Chai 1L.', 125000.00, NULL, 'chai 1L', 60, 'SHD-019', true, true, 234, 15, 4.60, 4, 'cat-004'),

-- Quà tặng
('prd-020', 'Giỏ Trái Cây Cao Cấp', 'gio-trai-cay-cao-cap', 'Giỏ trái cây cao cấp với 8-10 loại trái cây nhập khẩu và Việt Nam, trang trí sang trọng.', 890000.00, 999000.00, 'giỏ', 30, 'GTC-020', true, true, 567, 12, 4.90, 8, 'cat-005'),
('prd-021', 'Hộp Quà Trái Cây Mix', 'hop-qua-trai-cay-mix', 'Hộp quà trái cây mix với 5-6 loại trái cây đặc sản, phù hợp làm quà biếu.', 550000.00, 620000.00, 'hộp', 50, 'HQT-021', true, true, 432, 18, 4.80, 5, 'cat-005'),
('prd-022', 'Giỏ Trái Cây Việt Nam', 'gio-trai-cay-vn', 'Giỏ trái cây Việt Nam cao cấp với các loại trái cây đặc sản theo mùa.', 450000.00, 520000.00, 'giỏ', 40, 'GTV-022', false, true, 234, 9, 4.65, 3, 'cat-005');

-- =====================================================
-- SEED DATA: Product Images
-- =====================================================
INSERT INTO `product_images` (`id`, `productId`, `url`, `altText`, `isPrimary`, `sortOrder`) VALUES
-- Xoài Úc
('img-001', 'prd-001', 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=800', 'Xoài Úc Premium', true, 1),
('img-002', 'prd-001', 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800', 'Xoài Úc cắt lát', false, 2),
-- Nho Đen Mỹ
('img-003', 'prd-002', 'https://images.unsplash.com/photo-1568702846914-96b305d2ebb1?w=800', 'Nho Đen Mỹ', true, 1),
-- Táo Envy
('img-004', 'prd-003', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800', 'Táo Envy New Zealand', true, 1),
-- Cherry Chile
('img-005', 'prd-004', 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=800', 'Cherry Chile', true, 1),
-- Cam Valencia
('img-006', 'prd-005', 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800', 'Cam Valencia Tây Ban Nha', true, 1),
-- Xoài Cát Hòa Lộc
('img-007', 'prd-006', 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=800', 'Xoài Cát Hòa Lộc', true, 1),
('img-008', 'prd-006', 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800', 'Xoài Cát Hòa Lộc chín', false, 2),
-- Sầu Riêng
('img-009', 'prd-007', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800', 'Sầu Riêng Ri6', true, 1),
-- Vú Sữa
('img-010', 'prd-008', 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800', 'Vú Sữa Lò Rèn', true, 1),
-- Thanh Long
('img-011', 'prd-009', 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800', 'Thanh Long Bình Thuận', true, 1),
-- Bưởi
('img-012', 'prd-010', 'https://images.unsplash.com/photo-1596431707056-3d44c6bb7b15?w=800', 'Bưởi Năm Roi', true, 1),
-- Mít Sấy
('img-013', 'prd-013', 'https://images.unsplash.com/photo-1596272875729-ed2c21ebbbc0?w=800', 'Mít Sấy Giòn', true, 1),
-- Hạt Điều
('img-014', 'prd-015', 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800', 'Hạt Điều Rang Muối', true, 1),
-- Nước Ép Cam
('img-015', 'prd-017', 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800', 'Nước Ép Cam Vàng', true, 1),
-- Giỏ Trái Cây Cao Cấp
('img-016', 'prd-020', 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800', 'Giỏ Trái Cây Cao Cấp', true, 1),
('img-017', 'prd-020', 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800', 'Giỏ Trái Cây Chi Tiết', false, 2);

-- =====================================================
-- SEED DATA: Orders
-- =====================================================
INSERT INTO `orders` (`id`, `orderNumber`, `userId`, `status`, `subtotal`, `shippingFee`, `discount`, `total`, `shippingName`, `shippingPhone`, `shippingAddress`, `shippingNote`, `paymentMethod`, `paymentStatus`, `confirmedAt`, `shippedAt`, `completedAt`) VALUES
('ord-001', 'ORD-20260501-001', 'usr-002', 'COMPLETED', 435000.00, 0.00, 21750.00, 413250.00, 'Nguyễn Văn Nam', '0912345678', '456 Đường Lê Lợi, Quận 3, TP.HCM', 'Giao giờ hành chính', 'COD', 'PAID', '2026-05-01 10:30:00', '2026-05-02 09:00:00', '2026-05-03 15:30:00'),
('ord-002', 'ORD-20260502-001', 'usr-003', 'COMPLETED', 278000.00, 0.00, 13900.00, 264100.00, 'Trần Thị Lan', '0923456789', '789 Đường Nguyễn Huệ, Quận 1, TP.HCM', NULL, 'COD', 'PAID', '2026-05-02 14:15:00', '2026-05-03 10:30:00', '2026-05-04 16:00:00'),
('ord-003', 'ORD-20260503-001', 'usr-004', 'CONFIRMED', 890000.00, 0.00, 44500.00, 845500.00, 'Lê Hoàng Minh', '0934567890', '321 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM', 'Gọi điện trước khi giao', 'BANK_TRANSFER', 'PAID', '2026-05-03 16:45:00', NULL, NULL),
('ord-004', 'ORD-20260504-001', 'usr-002', 'SHIPPING', 189000.00, 0.00, 9450.00, 179550.00, 'Nguyễn Văn Nam', '0912345678', '456 Đường Lê Lợi, Quận 3, TP.HCM', NULL, 'COD', 'PENDING', '2026-05-04 11:20:00', '2026-05-05 08:30:00', NULL),
('ord-005', 'ORD-20260505-001', 'usr-005', 'PENDING', 315000.00, 0.00, 15750.00, 299250.00, 'Phạm Thị Hòa', '0945678901', '654 Đường Võ Văn Tần, Quận 3, TP.HCM', 'Để cửa chính', 'COD', 'PENDING', NULL, NULL, NULL),
('ord-006', 'ORD-20260505-002', 'usr-003', 'CANCELLED', 55000.00, 25000.00, 0.00, 80000.00, 'Trần Thị Lan', '0923456789', '789 Đường Nguyễn Huệ, Quận 1, TP.HCM', 'Khách hủy đơn', 'COD', 'FAILED', NULL, NULL, '2026-05-05 18:00:00');

-- =====================================================
-- SEED DATA: Order Items
-- =====================================================
INSERT INTO `order_items` (`id`, `orderId`, `productId`, `productName`, `productImage`, `quantity`, `price`, `total`) VALUES
-- Order 1
('oi-001', 'ord-001', 'prd-007', 'Sầu Riêng Ri6', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400', 2, 135000.00, 270000.00),
('oi-002', 'ord-001', 'prd-006', 'Xoài Cát Hòa Lộc', 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=400', 3, 55000.00, 165000.00),
-- Order 2
('oi-003', 'ord-002', 'prd-001', 'Xoài Úc Premium', 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=400', 2, 89000.00, 178000.00),
('oi-004', 'ord-002', 'prd-015', 'Hạt Điều Rang Muối', 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400', 1, 145000.00, 145000.00),
-- Order 3
('oi-005', 'ord-003', 'prd-020', 'Giỏ Trái Cây Cao Cấp', 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400', 1, 890000.00, 890000.00),
-- Order 4
('oi-006', 'ord-004', 'prd-004', 'Cherry Chile', 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=400', 1, 189000.00, 189000.00),
-- Order 5
('oi-007', 'ord-005', 'prd-017', 'Nước Ép Cam Vàng', 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400', 3, 55000.00, 165000.00),
('oi-008', 'ord-005', 'prd-015', 'Hạt Điều Rang Muối', 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400', 1, 145000.00, 145000.00),
-- Order 6
('oi-009', 'ord-006', 'prd-017', 'Nước Ép Cam Vàng', 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400', 1, 55000.00, 55000.00);

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
('rev-001', 'usr-002', 'prd-001', 5, 'Xoài Úc rất ngon, chín đều, ngọt đậm. Sẽ ủng hộ tiếp!'),
('rev-002', 'usr-003', 'prd-001', 4, 'Xoài ngon nhưng giao hơi trễ một ngày.'),
('rev-003', 'usr-002', 'prd-006', 5, 'Xoài Cát Hòa Lộc tươi rói, ngọt lịm. Đúng hàng Miền Tây!'),
('rev-004', 'usr-004', 'prd-007', 5, 'Sầu riêng Ri6 cơm vàng dẻo, ngon tuyệt! Ăn là mê.'),
('rev-005', 'usr-005', 'prd-007', 5, 'Mua 2 quả đều ngon, không失望.'),
('rev-006', 'usr-003', 'prd-015', 4, 'Hạt điều rang giòn, vừa miệng. Đóng gói đẹp.'),
('rev-007', 'usr-002', 'prd-017', 5, 'Nước ép cam nguyên chất, uống rất thơm.'),
('rev-008', 'usr-004', 'prd-020', 5, 'Giỏ trái cây đẹp, sang trọng. Giao đúng hẹn.');

-- =====================================================
-- SEED DATA: Chatbot FAQs
-- =====================================================
INSERT INTO `chatbot_faqs` (`id`, `question`, `answer`, `keywords`, `category`, `isActive`, `priority`) VALUES
('faq-001', 'Cửa hàng có giao hàng không?', 'Có, chúng tôi giao hàng toàn quốc. Nội thành TP.HCM giao trong 24h, các tỉnh khác 2-5 ngày tùy khoảng cách.', 'giao hàng, vận chuyển, ship', 'vanchuyen', true, 10),
('faq-002', 'Phí ship bao nhiêu?', 'Phí giao hàng: Đơn từ 500.000đ: MIỄN PHÍ. Đơn từ 200.000đ - dưới 500.000đ: 15.000đ. Đơn dưới 200.000đ: 25.000đ.', 'phí ship, phí giao, chi phí', 'vanchuyen', true, 9),
('faq-003', 'Thanh toán như thế nào?', 'Chúng tôi hỗ trợ: COD (thanh toán khi nhận hàng), Chuyển khoản ngân hàng, Ví MoMo, Ví ZaloPay.', 'thanh toán, trả tiền, COD, chuyển khoản', 'thanhtoan', true, 8),
('faq-004', 'Làm sao để đặt hàng?', 'Bạn có thể đặt hàng qua: 1. Website: Chọn sản phẩm -> Thêm vào giỏ -> Đặt hàng. 2. Hotline: 0901 234 567. 3. Zalo: 0901 234 567.', 'đặt hàng, mua, order', 'muahang', true, 7),
('faq-005', 'Sản phẩm có bảo hành không?', 'Với trái cây tươi, chúng tôi cam kết hoàn tiền 100% nếu sản phẩm không đúng chất lượng. Vui lòng liên hệ hotline trong vòng 24h kể từ khi nhận hàng.', 'bảo hành, hoàn tiền, đổi trả', 'baohanh', true, 6),
('faq-006', 'Giờ mở cửa?', 'Cửa hàng mở cửa từ 7:00 sáng đến 9:00 tối, thứ 2 đến CN (cả ngày lễ).', 'giờ mở cửa, giờ làm việc, thời gian', 'lienhe', true, 5),
('faq-007', 'Tôi muốn liên hệ?', 'Bạn có thể liên hệ: Hotline: 0901 234 567 (7:00-21:00). Email: contact@webbanhoaqua.com. Zalo: 0901 234 567. Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM.', 'liên hệ, hotline, số điện thoại, email', 'lienhe', true, 4),
('faq-008', 'Có chương trình khuyến mãi không?', 'Chúng tôi có nhiều ưu đãi: Giảm 5% đơn từ 500.000đ. Miễn phí ship đơn từ 500.000đ. Thường xuyên có flash sale vào các ngày cuối tuần.', 'khuyến mãi, giảm giá, ưu đãi, sale', 'khuyenmai', true, 3),
('faq-009', 'Trái cây có tươi không?', 'Tất cả trái cây tại WebBanhHoaqua được nhập hàng mới mỗi ngày, bảo quản trong kho lạnh đạt chuẩn. Chúng tôi cam kết giao sản phẩm tươi ngon nhất đến tay bạn.', 'tươi, chất lượng, tươi ngon', 'sanpham', true, 2),
('faq-010', 'Có hỗ trợ đổi trả không?', 'Có, chúng tôi hỗ trợ đổi trả trong các trường hợp: Sản phẩm hư hỏng do vận chuyển, Sản phẩm không đúng như mô tả. Vui lòng gửi hình ảnh và liên hệ hotline trong vòng 24h.', 'đổi trả, trả hàng, hoàn tiền', 'baohanh', true, 1);

-- =====================================================
-- END
-- =====================================================
