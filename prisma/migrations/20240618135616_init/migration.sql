-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `orders` VARCHAR(55) NOT NULL,
    `last_order` VARCHAR(56) NOT NULL,
    `total_spent` VARCHAR(30) NOT NULL,
    `refunds` VARCHAR(67) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
