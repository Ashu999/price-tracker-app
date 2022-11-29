-- CreateTable
CREATE TABLE `all_auth_recipe_users` (
    `user_id` CHAR(36) NOT NULL,
    `recipe_id` VARCHAR(128) NOT NULL,
    `time_joined` BIGINT UNSIGNED NOT NULL,

    INDEX `all_auth_recipe_users_pagination_index`(`time_joined` DESC, `user_id` DESC),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emailpassword_pswd_reset_tokens` (
    `user_id` CHAR(36) NOT NULL,
    `token` VARCHAR(128) NOT NULL,
    `token_expiry` BIGINT UNSIGNED NOT NULL,

    UNIQUE INDEX `token`(`token`),
    INDEX `emailpassword_password_reset_token_expiry_index`(`token_expiry`),
    PRIMARY KEY (`user_id`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emailpassword_users` (
    `user_id` CHAR(36) NOT NULL,
    `email` VARCHAR(256) NOT NULL,
    `password_hash` VARCHAR(256) NOT NULL,
    `time_joined` BIGINT UNSIGNED NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emailverification_tokens` (
    `user_id` VARCHAR(128) NOT NULL,
    `email` VARCHAR(256) NOT NULL,
    `token` VARCHAR(128) NOT NULL,
    `token_expiry` BIGINT UNSIGNED NOT NULL,

    UNIQUE INDEX `token`(`token`),
    INDEX `emailverification_tokens_index`(`token_expiry`),
    PRIMARY KEY (`user_id`, `email`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emailverification_verified_emails` (
    `user_id` VARCHAR(128) NOT NULL,
    `email` VARCHAR(256) NOT NULL,

    PRIMARY KEY (`user_id`, `email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jwt_signing_keys` (
    `key_id` VARCHAR(255) NOT NULL,
    `key_string` TEXT NOT NULL,
    `algorithm` VARCHAR(10) NOT NULL,
    `created_at` BIGINT UNSIGNED NULL,

    PRIMARY KEY (`key_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `key_value` (
    `name` VARCHAR(128) NOT NULL,
    `value` TEXT NULL,
    `created_at_time` BIGINT UNSIGNED NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `passwordless_codes` (
    `code_id` CHAR(36) NOT NULL,
    `device_id_hash` CHAR(44) NOT NULL,
    `link_code_hash` CHAR(44) NOT NULL,
    `created_at` BIGINT UNSIGNED NOT NULL,

    UNIQUE INDEX `link_code_hash`(`link_code_hash`),
    INDEX `device_id_hash`(`device_id_hash`),
    INDEX `passwordless_codes_created_at_index`(`created_at`),
    PRIMARY KEY (`code_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `passwordless_devices` (
    `device_id_hash` CHAR(44) NOT NULL,
    `email` VARCHAR(256) NULL,
    `phone_number` VARCHAR(256) NULL,
    `link_code_salt` CHAR(44) NOT NULL,
    `failed_attempts` INTEGER UNSIGNED NOT NULL,

    INDEX `passwordless_devices_email_index`(`email`),
    INDEX `passwordless_devices_phone_number_index`(`phone_number`),
    PRIMARY KEY (`device_id_hash`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `passwordless_users` (
    `user_id` CHAR(36) NOT NULL,
    `email` VARCHAR(256) NULL,
    `phone_number` VARCHAR(256) NULL,
    `time_joined` BIGINT UNSIGNED NOT NULL,

    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `phone_number`(`phone_number`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_permissions` (
    `role` VARCHAR(255) NOT NULL,
    `permission` VARCHAR(255) NOT NULL,

    INDEX `role_permissions_permission_index`(`permission`),
    PRIMARY KEY (`role`, `permission`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `role` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session_access_token_signing_keys` (
    `created_at_time` BIGINT UNSIGNED NOT NULL,
    `value` TEXT NULL,

    PRIMARY KEY (`created_at_time`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session_info` (
    `session_handle` VARCHAR(255) NOT NULL,
    `user_id` VARCHAR(128) NOT NULL,
    `refresh_token_hash_2` VARCHAR(128) NOT NULL,
    `session_data` TEXT NULL,
    `expires_at` BIGINT UNSIGNED NOT NULL,
    `created_at_time` BIGINT UNSIGNED NOT NULL,
    `jwt_user_payload` TEXT NULL,

    PRIMARY KEY (`session_handle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `thirdparty_users` (
    `third_party_id` VARCHAR(28) NOT NULL,
    `third_party_user_id` VARCHAR(256) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `email` VARCHAR(256) NOT NULL,
    `time_joined` BIGINT UNSIGNED NOT NULL,

    UNIQUE INDEX `user_id`(`user_id`),
    PRIMARY KEY (`third_party_id`, `third_party_user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_metadata` (
    `user_id` VARCHAR(128) NOT NULL,
    `user_metadata` TEXT NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_roles` (
    `user_id` VARCHAR(128) NOT NULL,
    `role` VARCHAR(255) NOT NULL,

    INDEX `user_roles_role_index`(`role`),
    PRIMARY KEY (`user_id`, `role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userid_mapping` (
    `supertokens_user_id` CHAR(36) NOT NULL,
    `external_user_id` VARCHAR(128) NOT NULL,
    `external_user_id_info` TEXT NULL,

    UNIQUE INDEX `supertokens_user_id`(`supertokens_user_id`),
    UNIQUE INDEX `external_user_id`(`external_user_id`),
    PRIMARY KEY (`supertokens_user_id`, `external_user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `emailpassword_pswd_reset_tokens` ADD CONSTRAINT `emailpassword_pswd_reset_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `emailpassword_users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `passwordless_codes` ADD CONSTRAINT `passwordless_codes_ibfk_1` FOREIGN KEY (`device_id_hash`) REFERENCES `passwordless_devices`(`device_id_hash`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role`) REFERENCES `roles`(`role`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`role`) REFERENCES `roles`(`role`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `userid_mapping` ADD CONSTRAINT `userid_mapping_ibfk_1` FOREIGN KEY (`supertokens_user_id`) REFERENCES `all_auth_recipe_users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
