/*
  Warnings:

  - You are about to drop the column `rincianPekerjaanId` on the `km2rincianpekerjaan` table. All the data in the column will be lost.
  - You are about to drop the column `id_rincian_pekerjaan` on the `km3rincianpekerjaan` table. All the data in the column will be lost.
  - You are about to drop the `kelompokrincianpekerjaan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rincianpekerjaan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `km2rincianpekerjaan` DROP FOREIGN KEY `KM2RincianPekerjaan_rincianPekerjaanId_fkey`;

-- DropForeignKey
ALTER TABLE `km3rincianpekerjaan` DROP FOREIGN KEY `KM3RincianPekerjaan_id_rincian_pekerjaan_fkey`;

-- DropForeignKey
ALTER TABLE `rincianpekerjaan` DROP FOREIGN KEY `RincianPekerjaan_id_kelompok_rincian_pekerjaan_fkey`;

-- DropIndex
DROP INDEX `KM2RincianPekerjaan_rincianPekerjaanId_fkey` ON `km2rincianpekerjaan`;

-- DropIndex
DROP INDEX `KM3RincianPekerjaan_id_rincian_pekerjaan_fkey` ON `km3rincianpekerjaan`;

-- AlterTable
ALTER TABLE `km2rincianpekerjaan` DROP COLUMN `rincianPekerjaanId`,
    MODIFY `id_kelompok_pengawasan` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `km3rincianpekerjaan` DROP COLUMN `id_rincian_pekerjaan`,
    ADD COLUMN `id_item_pengawasan` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `id_kelompok_pengawasan` INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE `kelompokrincianpekerjaan`;

-- DropTable
DROP TABLE `rincianpekerjaan`;

-- AddForeignKey
ALTER TABLE `KM3RincianPekerjaan` ADD CONSTRAINT `KM3RincianPekerjaan_id_kelompok_pengawasan_fkey` FOREIGN KEY (`id_kelompok_pengawasan`) REFERENCES `Kelompok_pengawasan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM3RincianPekerjaan` ADD CONSTRAINT `KM3RincianPekerjaan_id_item_pengawasan_fkey` FOREIGN KEY (`id_item_pengawasan`) REFERENCES `Item_pengawasan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
