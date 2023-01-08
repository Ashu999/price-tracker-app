-- CreateTable
CREATE TABLE `item_details` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(256) NOT NULL,
    `url` VARCHAR(512) NOT NULL,
    `price` VARCHAR(10) NOT NULL,
    `supertokens_user_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `item_details_id_key`(`id`),
    INDEX `item_details_supertokens_user_id_created_at_updated_at_idx`(`supertokens_user_id`, `created_at` DESC, `updated_at` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
