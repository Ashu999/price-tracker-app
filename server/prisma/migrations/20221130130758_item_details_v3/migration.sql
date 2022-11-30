/*
  Warnings:

  - Added the required column `user_id` to the `item_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `item_details` ADD COLUMN `user_id` VARCHAR(256) NOT NULL;
