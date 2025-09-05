/*
  Warnings:

  - You are about to drop the column `anggaran_biaya` on the `km3` table. All the data in the column will be lost.
  - You are about to drop the column `anggaran_jam` on the `km3` table. All the data in the column will be lost.
  - You are about to drop the column `id_item_jenis_pekerjaan` on the `km3` table. All the data in the column will be lost.
  - You are about to drop the column `id_jenis_pekerjaan` on the `km3` table. All the data in the column will be lost.
  - You are about to drop the column `realisasi_biaya` on the `km3` table. All the data in the column will be lost.
  - You are about to drop the column `rencana_jam` on the `km3` table. All the data in the column will be lost.
  - You are about to drop the `itemjenispekerjaan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jenispekerjaan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `km3rencanarealisasiwaktu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `penugasankm2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `penugasankm2itemjenispekerjaan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `km3` DROP FOREIGN KEY `KM3_id_item_jenis_pekerjaan_fkey`;

-- DropForeignKey
ALTER TABLE `km3` DROP FOREIGN KEY `KM3_id_jenis_pekerjaan_fkey`;

-- DropForeignKey
ALTER TABLE `km3rencanarealisasiwaktu` DROP FOREIGN KEY `KM3RencanaRealisasiWaktu_id_km3_fkey`;

-- DropForeignKey
ALTER TABLE `km3rencanarealisasiwaktu` DROP FOREIGN KEY `KM3RencanaRealisasiWaktu_id_peran_fkey`;

-- DropForeignKey
ALTER TABLE `penugasankm2` DROP FOREIGN KEY `PenugasanKM2_id_item_jenis_pekerjaan_fkey`;

-- DropForeignKey
ALTER TABLE `penugasankm2` DROP FOREIGN KEY `PenugasanKM2_id_jenis_pekerjaan_fkey`;

-- DropForeignKey
ALTER TABLE `penugasankm2itemjenispekerjaan` DROP FOREIGN KEY `PenugasanKM2ItemJenisPekerjaan_id_item_jenis_pekerjaan_fkey`;

-- DropForeignKey
ALTER TABLE `penugasankm2itemjenispekerjaan` DROP FOREIGN KEY `PenugasanKM2ItemJenisPekerjaan_id_penugasan_km2_fkey`;

-- DropIndex
DROP INDEX `KM3_id_item_jenis_pekerjaan_fkey` ON `km3`;

-- DropIndex
DROP INDEX `KM3_id_jenis_pekerjaan_fkey` ON `km3`;

-- AlterTable
ALTER TABLE `km3` DROP COLUMN `anggaran_biaya`,
    DROP COLUMN `anggaran_jam`,
    DROP COLUMN `id_item_jenis_pekerjaan`,
    DROP COLUMN `id_jenis_pekerjaan`,
    DROP COLUMN `realisasi_biaya`,
    DROP COLUMN `rencana_jam`;

-- DropTable
DROP TABLE `itemjenispekerjaan`;

-- DropTable
DROP TABLE `jenispekerjaan`;

-- DropTable
DROP TABLE `km3rencanarealisasiwaktu`;

-- DropTable
DROP TABLE `penugasankm2`;

-- DropTable
DROP TABLE `penugasankm2itemjenispekerjaan`;

-- CreateTable
CREATE TABLE `KM3RincianPekerjaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_km3` INTEGER NOT NULL,
    `id_rincian_pekerjaan` INTEGER NOT NULL,
    `rencana_jam` DOUBLE NULL,
    `anggaran_jam` DOUBLE NULL,
    `realisasi_biaya` DOUBLE NULL,
    `anggaran_biaya` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `KM3RincianPekerjaan` ADD CONSTRAINT `KM3RincianPekerjaan_id_km3_fkey` FOREIGN KEY (`id_km3`) REFERENCES `KM3`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM3RincianPekerjaan` ADD CONSTRAINT `KM3RincianPekerjaan_id_rincian_pekerjaan_fkey` FOREIGN KEY (`id_rincian_pekerjaan`) REFERENCES `RincianPekerjaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
