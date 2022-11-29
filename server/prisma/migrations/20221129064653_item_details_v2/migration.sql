/*
  Warnings:

  - You are about to alter the column `name` on the `item_details` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(256)`.
  - Added the required column `price` to the `item_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `item_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `item_details` ADD COLUMN `price` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `url` VARCHAR(512) NOT NULL,
    MODIFY `name` VARCHAR(256) NOT NULL;
