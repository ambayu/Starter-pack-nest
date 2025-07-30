/*
  Warnings:

  - You are about to drop the column `id_peraturan_tahunan` on the `kegiatan_asb` table. All the data in the column will be lost.
  - You are about to drop the column `id_kategori_komponen` on the `komponen_asb` table. All the data in the column will be lost.
  - You are about to drop the `harga_referensi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kategori_komponen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `peraturan_tahunan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `harga_referensi` DROP FOREIGN KEY `Harga_Referensi_id_peraturan_tahunan_fkey`;

-- DropForeignKey
ALTER TABLE `harga_referensi` DROP FOREIGN KEY `Harga_Referensi_id_satuan_fkey`;

-- DropForeignKey
ALTER TABLE `kegiatan_asb` DROP FOREIGN KEY `Kegiatan_ASB_id_peraturan_tahunan_fkey`;

-- DropForeignKey
ALTER TABLE `komponen_asb` DROP FOREIGN KEY `Komponen_ASB_id_kategori_komponen_fkey`;

-- DropIndex
DROP INDEX `Kegiatan_ASB_id_peraturan_tahunan_fkey` ON `kegiatan_asb`;

-- DropIndex
DROP INDEX `Komponen_ASB_id_kategori_komponen_fkey` ON `komponen_asb`;

-- AlterTable
ALTER TABLE `kegiatan_asb` DROP COLUMN `id_peraturan_tahunan`;

-- AlterTable
ALTER TABLE `komponen_asb` DROP COLUMN `id_kategori_komponen`;

-- DropTable
DROP TABLE `harga_referensi`;

-- DropTable
DROP TABLE `kategori_komponen`;

-- DropTable
DROP TABLE `peraturan_tahunan`;
