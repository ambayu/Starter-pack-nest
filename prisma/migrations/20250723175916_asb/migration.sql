/*
  Warnings:

  - You are about to drop the column `id_tahun` on the `harga_referensi` table. All the data in the column will be lost.
  - You are about to drop the column `id_tahun` on the `kegiatan_asb` table. All the data in the column will be lost.
  - Added the required column `id_peraturan_tahunan` to the `Harga_Referensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_peraturan_tahunan` to the `Kegiatan_ASB` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `harga_referensi` DROP FOREIGN KEY `Harga_Referensi_id_tahun_fkey`;

-- DropForeignKey
ALTER TABLE `kegiatan_asb` DROP FOREIGN KEY `Kegiatan_ASB_id_tahun_fkey`;

-- DropIndex
DROP INDEX `Harga_Referensi_id_tahun_fkey` ON `harga_referensi`;

-- DropIndex
DROP INDEX `Kegiatan_ASB_id_tahun_fkey` ON `kegiatan_asb`;

-- AlterTable
ALTER TABLE `harga_referensi` DROP COLUMN `id_tahun`,
    ADD COLUMN `id_peraturan_tahunan` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `kegiatan_asb` DROP COLUMN `id_tahun`,
    ADD COLUMN `id_peraturan_tahunan` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Harga_Referensi` ADD CONSTRAINT `Harga_Referensi_id_peraturan_tahunan_fkey` FOREIGN KEY (`id_peraturan_tahunan`) REFERENCES `Peraturan_Tahunan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kegiatan_ASB` ADD CONSTRAINT `Kegiatan_ASB_id_peraturan_tahunan_fkey` FOREIGN KEY (`id_peraturan_tahunan`) REFERENCES `Peraturan_Tahunan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
