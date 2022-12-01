/*
  Warnings:

  - The primary key for the `item_details` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `item_details` table. All the data in the column will be lost.
  - Added the required column `supertokens_user_id` to the `item_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `item_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `item_details` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `supertokens_user_id` CHAR(36) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE INDEX `item_details_supertokens_user_id_created_at_updated_at_idx` ON `item_details`(`supertokens_user_id`, `created_at` DESC, `updated_at` DESC);

-- AddForeignKey
ALTER TABLE `item_details` ADD CONSTRAINT `item_details_ibfk_1` FOREIGN KEY (`supertokens_user_id`) REFERENCES `all_auth_recipe_users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
