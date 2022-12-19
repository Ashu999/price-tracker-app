/*
  Warnings:

  - Made the column `updated_at` on table `item_details` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `item_details` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL;
