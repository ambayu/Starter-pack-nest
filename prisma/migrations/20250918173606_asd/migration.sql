/*
  Warnings:

  - Added the required column `createdBy` to the `Penugasan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `km1` ADD COLUMN `nomor_kartu` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `penugasan` ADD COLUMN `createdBy` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `updatedBy` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
