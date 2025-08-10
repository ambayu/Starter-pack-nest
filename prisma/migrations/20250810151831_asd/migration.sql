/*
  Warnings:

  - You are about to drop the `itemkegiatanasb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itemkegiatanhspk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kegiatan_asb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kegiatan_hspk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kelompok_asb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kelompok_hspk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `komponen_asb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `komponen_hspk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `satuan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subkegiatan_asb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subkegiatan_hspk` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `itemkegiatanasb` DROP FOREIGN KEY `itemKegiatanASB_id_sub_kegiatan_asb_fkey`;

-- DropForeignKey
ALTER TABLE `itemkegiatanhspk` DROP FOREIGN KEY `itemKegiatanHSPK_id_sub_kegiatan_HSPK_fkey`;

-- DropForeignKey
ALTER TABLE `kegiatan_asb` DROP FOREIGN KEY `Kegiatan_ASB_id_kelompok_asb_fkey`;

-- DropForeignKey
ALTER TABLE `kegiatan_hspk` DROP FOREIGN KEY `Kegiatan_HSPK_id_kelompok_HSPK_fkey`;

-- DropForeignKey
ALTER TABLE `komponen_asb` DROP FOREIGN KEY `Komponen_ASB_id_item_kegiatan_asb_fkey`;

-- DropForeignKey
ALTER TABLE `komponen_asb` DROP FOREIGN KEY `Komponen_ASB_id_satuan_fkey`;

-- DropForeignKey
ALTER TABLE `komponen_asb` DROP FOREIGN KEY `Komponen_ASB_kegiatan_ASBId_fkey`;

-- DropForeignKey
ALTER TABLE `komponen_asb` DROP FOREIGN KEY `Komponen_ASB_subKegiatan_ASBId_fkey`;

-- DropForeignKey
ALTER TABLE `komponen_hspk` DROP FOREIGN KEY `Komponen_HSPK_id_item_kegiatan_HSPK_fkey`;

-- DropForeignKey
ALTER TABLE `komponen_hspk` DROP FOREIGN KEY `Komponen_HSPK_id_kegiatan_HSPK_fkey`;

-- DropForeignKey
ALTER TABLE `komponen_hspk` DROP FOREIGN KEY `Komponen_HSPK_id_satuan_fkey`;

-- DropForeignKey
ALTER TABLE `komponen_hspk` DROP FOREIGN KEY `Komponen_HSPK_id_sub_kegiatan_HSPK_fkey`;

-- DropForeignKey
ALTER TABLE `subkegiatan_asb` DROP FOREIGN KEY `SubKegiatan_ASB_id_kegiatan_asb_fkey`;

-- DropForeignKey
ALTER TABLE `subkegiatan_asb` DROP FOREIGN KEY `SubKegiatan_ASB_kelompok_ASBId_fkey`;

-- DropForeignKey
ALTER TABLE `subkegiatan_hspk` DROP FOREIGN KEY `SubKegiatan_HSPK_id_kegiatan_HSPK_fkey`;

-- DropForeignKey
ALTER TABLE `subkegiatan_hspk` DROP FOREIGN KEY `SubKegiatan_HSPK_id_kelompok_HSPK_fkey`;

-- DropTable
DROP TABLE `itemkegiatanasb`;

-- DropTable
DROP TABLE `itemkegiatanhspk`;

-- DropTable
DROP TABLE `kegiatan_asb`;

-- DropTable
DROP TABLE `kegiatan_hspk`;

-- DropTable
DROP TABLE `kelompok_asb`;

-- DropTable
DROP TABLE `kelompok_hspk`;

-- DropTable
DROP TABLE `komponen_asb`;

-- DropTable
DROP TABLE `komponen_hspk`;

-- DropTable
DROP TABLE `satuan`;

-- DropTable
DROP TABLE `subkegiatan_asb`;

-- DropTable
DROP TABLE `subkegiatan_hspk`;
