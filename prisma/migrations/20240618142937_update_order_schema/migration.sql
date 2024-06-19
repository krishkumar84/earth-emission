-- AlterTable
ALTER TABLE `order` MODIFY `orders` VARCHAR(191) NOT NULL,
    MODIFY `last_order` VARCHAR(191) NOT NULL,
    MODIFY `total_spent` VARCHAR(191) NOT NULL,
    MODIFY `refunds` VARCHAR(191) NOT NULL;
