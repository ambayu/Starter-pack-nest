/*
  Warnings:

  - Added the required column `id_rincian_pekerjaan` to the `KM2` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `km2rincianpekerjaan` DROP FOREIGN KEY `KM2RincianPekerjaan_id_km2_fkey`;

-- DropIndex
DROP INDEX `KM2RincianPekerjaan_id_km2_fkey` ON `km2rincianpekerjaan`;

-- AlterTable
ALTER TABLE `km2` ADD COLUMN `id_rincian_pekerjaan` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `RincianPekerjaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kelompok` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kelompok` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `KM2` ADD CONSTRAINT `KM2_id_rincian_pekerjaan_fkey` FOREIGN KEY (`id_rincian_pekerjaan`) REFERENCES `RincianPekerjaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RincianPekerjaan` ADD CONSTRAINT `RincianPekerjaan_id_kelompok_fkey` FOREIGN KEY (`id_kelompok`) REFERENCES `Kelompok`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
