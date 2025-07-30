/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `kegiatan_asb` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `kegiatan_asb` DROP COLUMN `deletedAt`;

-- CreateTable
CREATE TABLE `SubKegiatan_ASB` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NULL,
    `uraian` VARCHAR(191) NULL,
    `id_kegiatan_asb` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SubKegiatan_ASB` ADD CONSTRAINT `SubKegiatan_ASB_id_kegiatan_asb_fkey` FOREIGN KEY (`id_kegiatan_asb`) REFERENCES `Kegiatan_ASB`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
