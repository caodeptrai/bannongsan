CREATE TABLE `system_settings` (
  `id` VARCHAR(191) NOT NULL,
  `siteName` VARCHAR(191) NOT NULL DEFAULT 'WebBanHoaQua',
  `contactEmail` VARCHAR(191) NULL,
  `contactPhone` VARCHAR(191) NULL,
  `address` TEXT NULL,
  `businessHours` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,

  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
