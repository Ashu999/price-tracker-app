-- CreateTable
CREATE TABLE `item_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(500) NOT NULL,

    UNIQUE INDEX `item_details_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
