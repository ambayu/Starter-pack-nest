/*
  Warnings:

  - You are about to drop the column `id_rincian_pekerjaan` on the `km2` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `km2` DROP FOREIGN KEY `KM2_id_rincian_pekerjaan_fkey`;

-- DropIndex
DROP INDEX `KM2_id_rincian_pekerjaan_fkey` ON `km2`;

-- AlterTable
ALTER TABLE `km2` DROP COLUMN `id_rincian_pekerjaan`;

-- AddForeignKey
ALTER TABLE `KM2RincianPekerjaan` ADD CONSTRAINT `KM2RincianPekerjaan_id_rincian_pekerjaan_fkey` FOREIGN KEY (`id_rincian_pekerjaan`) REFERENCES `RincianPekerjaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
