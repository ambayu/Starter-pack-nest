/*
  Warnings:

  - You are about to drop the column `id_jenis_pekerjaan` on the `km2rincianpekerjaan` table. All the data in the column will be lost.
  - You are about to drop the column `id_penugasan_km2` on the `km2rincianpekerjaan` table. All the data in the column will be lost.
  - Added the required column `anggaran_waktu` to the `KM2RincianPekerjaan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_rincian_pekerjaan` to the `KM2RincianPekerjaan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `KM2RincianPekerjaan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `km2rincianpekerjaan` DROP FOREIGN KEY `KM2RincianPekerjaan_id_jenis_pekerjaan_fkey`;

-- DropForeignKey
ALTER TABLE `km2rincianpekerjaan` DROP FOREIGN KEY `KM2RincianPekerjaan_id_penugasan_km2_fkey`;

-- DropIndex
DROP INDEX `KM2RincianPekerjaan_id_jenis_pekerjaan_fkey` ON `km2rincianpekerjaan`;

-- DropIndex
DROP INDEX `KM2RincianPekerjaan_id_penugasan_km2_fkey` ON `km2rincianpekerjaan`;

-- AlterTable
ALTER TABLE `km2rincianpekerjaan` DROP COLUMN `id_jenis_pekerjaan`,
    DROP COLUMN `id_penugasan_km2`,
    ADD COLUMN `anggaran_waktu` INTEGER NOT NULL,
    ADD COLUMN `id_rincian_pekerjaan` INTEGER NOT NULL,
    ADD COLUMN `tanggal` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `KM2Pelaksana` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pelaksana` INTEGER NOT NULL,
    `id_km2_rincian_pekerjaan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pelaksana` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `KM2RincianPekerjaan` ADD CONSTRAINT `KM2RincianPekerjaan_id_km2_fkey` FOREIGN KEY (`id_km2`) REFERENCES `KM2`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM2Pelaksana` ADD CONSTRAINT `KM2Pelaksana_id_km2_rincian_pekerjaan_fkey` FOREIGN KEY (`id_km2_rincian_pekerjaan`) REFERENCES `KM2RincianPekerjaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM2Pelaksana` ADD CONSTRAINT `KM2Pelaksana_id_pelaksana_fkey` FOREIGN KEY (`id_pelaksana`) REFERENCES `Pelaksana`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
