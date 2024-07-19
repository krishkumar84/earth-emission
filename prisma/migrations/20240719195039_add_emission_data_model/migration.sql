-- CreateTable
CREATE TABLE `EmissionData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sector` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `cloud_provider` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `cpu_load` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `duration_unit` VARCHAR(191) NOT NULL,
    `cpu_count` VARCHAR(191) NOT NULL,
    `co2e` DOUBLE NOT NULL,
    `co2e_unit` VARCHAR(191) NOT NULL,
    `co2e_calculation_method` VARCHAR(191) NOT NULL,
    `co2e_calculation_origin` VARCHAR(191) NOT NULL,
    `activity_data_value` INTEGER NOT NULL,
    `activity_data_unit` VARCHAR(191) NOT NULL,
    `audit_trail` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
