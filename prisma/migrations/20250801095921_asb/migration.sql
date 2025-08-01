/*
  Warnings:

  - You are about to drop the column `id_satuan` on the `kegiatan_asb` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `kegiatan_asb` DROP FOREIGN KEY `Kegiatan_ASB_id_satuan_fkey`;

-- DropIndex
DROP INDEX `Kegiatan_ASB_id_satuan_fkey` ON `kegiatan_asb`;

-- AlterTable
ALTER TABLE `kegiatan_asb` DROP COLUMN `id_satuan`,
    ADD COLUMN `id_kelompok_asb` INTEGER NULL;

-- AlterTable
ALTER TABLE `subkegiatan_asb` ADD COLUMN `kelompok_ASBId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Kelompok_ASB` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NULL,
    `uraian` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itemKegiatanASB` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NULL,
    `uraian` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `kelompok_ASBId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Kegiatan_ASB` ADD CONSTRAINT `Kegiatan_ASB_id_kelompok_asb_fkey` FOREIGN KEY (`id_kelompok_asb`) REFERENCES `Kelompok_ASB`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubKegiatan_ASB` ADD CONSTRAINT `SubKegiatan_ASB_kelompok_ASBId_fkey` FOREIGN KEY (`kelompok_ASBId`) REFERENCES `Kelompok_ASB`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
