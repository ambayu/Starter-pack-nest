/*
  Warnings:

  - You are about to drop the column `id_pelaksana` on the `km2pelaksana` table. All the data in the column will be lost.
  - Added the required column `id_peran` to the `KM2Pelaksana` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_kelompok_pengawasan` to the `KM2RincianPekerjaan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `km2pelaksana` DROP FOREIGN KEY `KM2Pelaksana_id_pelaksana_fkey`;

-- DropIndex
DROP INDEX `KM2Pelaksana_id_pelaksana_fkey` ON `km2pelaksana`;

-- AlterTable
ALTER TABLE `km2pelaksana` DROP COLUMN `id_pelaksana`,
    ADD COLUMN `id_peran` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `km2rincianpekerjaan` ADD COLUMN `id_kelompok_pengawasan` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `KM2RincianPekerjaan` ADD CONSTRAINT `KM2RincianPekerjaan_id_kelompok_pengawasan_fkey` FOREIGN KEY (`id_kelompok_pengawasan`) REFERENCES `Kelompok_pengawasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM2Pelaksana` ADD CONSTRAINT `KM2Pelaksana_id_peran_fkey` FOREIGN KEY (`id_peran`) REFERENCES `Peran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
