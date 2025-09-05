/*
  Warnings:

  - You are about to drop the column `id_kelompok` on the `rincianpekerjaan` table. All the data in the column will be lost.
  - You are about to drop the `kelompok` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_kelompok_rincian_pekerjaan` to the `RincianPekerjaan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `rincianpekerjaan` DROP FOREIGN KEY `RincianPekerjaan_id_kelompok_fkey`;

-- DropIndex
DROP INDEX `RincianPekerjaan_id_kelompok_fkey` ON `rincianpekerjaan`;

-- AlterTable
ALTER TABLE `rincianpekerjaan` DROP COLUMN `id_kelompok`,
    ADD COLUMN `id_kelompok_rincian_pekerjaan` INTEGER NOT NULL;

-- DropTable
DROP TABLE `kelompok`;

-- CreateTable
CREATE TABLE `KelompokRincianPekerjaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RincianPekerjaan` ADD CONSTRAINT `RincianPekerjaan_id_kelompok_rincian_pekerjaan_fkey` FOREIGN KEY (`id_kelompok_rincian_pekerjaan`) REFERENCES `KelompokRincianPekerjaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
