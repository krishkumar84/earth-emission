/*
  Warnings:

  - You are about to drop the column `lastOrder` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `spent` on the `order` table. All the data in the column will be lost.
  - Added the required column `last_order` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_spent` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `lastOrder`,
    DROP COLUMN `spent`,
    ADD COLUMN `last_order` VARCHAR(191) NOT NULL,
    ADD COLUMN `total_spent` VARCHAR(191) NOT NULL;
