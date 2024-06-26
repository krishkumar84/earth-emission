/*
  Warnings:

  - You are about to drop the column `last_order` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `total_spent` on the `order` table. All the data in the column will be lost.
  - Added the required column `lastOrder` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spent` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `last_order`,
    DROP COLUMN `total_spent`,
    ADD COLUMN `lastOrder` VARCHAR(191) NOT NULL,
    ADD COLUMN `spent` VARCHAR(191) NOT NULL;
