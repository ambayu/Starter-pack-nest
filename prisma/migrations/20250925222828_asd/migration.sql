/*
  Warnings:

  - You are about to drop the `tanggal_urutan_pekerjaan_pelaporan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tanggal_urutan_pekerjaan_pelaporan` DROP FOREIGN KEY `tanggal_urutan_pekerjaan_pelaporan_id_urutan_pekerjaan_pela_fkey`;

-- AlterTable
ALTER TABLE `urutan_pekerjaan_pelaporan` ADD COLUMN `tanggal_1` DATETIME(3) NULL,
    ADD COLUMN `tanggal_2` DATETIME(3) NULL,
    ADD COLUMN `tanggal_3` DATETIME(3) NULL,
    ADD COLUMN `tanggal_4` DATETIME(3) NULL;

-- DropTable
DROP TABLE `tanggal_urutan_pekerjaan_pelaporan`;
