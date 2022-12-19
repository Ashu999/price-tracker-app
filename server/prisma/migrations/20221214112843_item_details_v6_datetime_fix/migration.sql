/*
  Warnings:

  - You are about to alter the column `created_at` on the `item_details` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `item_details` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `item_details` MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME NULL DEFAULT NOW() ON UPDATE NOW();
