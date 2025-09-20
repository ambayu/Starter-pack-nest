/*
  Warnings:

  - You are about to drop the column `tanggal` on the `km2rincianpekerjaan` table. All the data in the column will be lost.
  - Added the required column `tanggal_akhir` to the `KM2RincianPekerjaan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_awal` to the `KM2RincianPekerjaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `km2rincianpekerjaan` DROP COLUMN `tanggal`,
    ADD COLUMN `tanggal_akhir` DATETIME(3) NOT NULL,
    ADD COLUMN `tanggal_awal` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `pkpt` MODIFY `tingkat_resiko` VARCHAR(191) NOT NULL DEFAULT 'Rendah';
