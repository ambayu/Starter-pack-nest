/*
  Warnings:

  - Added the required column `updatedAt` to the `HargaReferensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `KategoriKomponen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `KegiatanASB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `KomponenASB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PeraturanTahunan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Satuan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `hargareferensi` DROP FOREIGN KEY `HargaReferensi_satuanId_fkey`;

-- DropForeignKey
ALTER TABLE `hargareferensi` DROP FOREIGN KEY `HargaReferensi_tahunId_fkey`;

-- DropForeignKey
ALTER TABLE `kegiatanasb` DROP FOREIGN KEY `KegiatanASB_satuanId_fkey`;

-- DropForeignKey
ALTER TABLE `kegiatanasb` DROP FOREIGN KEY `KegiatanASB_tahunId_fkey`;

-- DropForeignKey
ALTER TABLE `komponenasb` DROP FOREIGN KEY `KomponenASB_kategoriId_fkey`;

-- DropForeignKey
ALTER TABLE `komponenasb` DROP FOREIGN KEY `KomponenASB_kegiatanId_fkey`;

-- DropForeignKey
ALTER TABLE `komponenasb` DROP FOREIGN KEY `KomponenASB_satuanId_fkey`;

-- DropIndex
DROP INDEX `HargaReferensi_satuanId_fkey` ON `hargareferensi`;

-- DropIndex
DROP INDEX `HargaReferensi_tahunId_fkey` ON `hargareferensi`;

-- DropIndex
DROP INDEX `KegiatanASB_satuanId_fkey` ON `kegiatanasb`;

-- DropIndex
DROP INDEX `KegiatanASB_tahunId_fkey` ON `kegiatanasb`;

-- DropIndex
DROP INDEX `KomponenASB_kategoriId_fkey` ON `komponenasb`;

-- DropIndex
DROP INDEX `KomponenASB_kegiatanId_fkey` ON `komponenasb`;

-- DropIndex
DROP INDEX `KomponenASB_satuanId_fkey` ON `komponenasb`;

-- AlterTable
ALTER TABLE `hargareferensi` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `kategorikomponen` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `kegiatanasb` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `komponenasb` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `peraturantahunan` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `satuan` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `HargaReferensi` ADD CONSTRAINT `HargaReferensi_satuanId_fkey` FOREIGN KEY (`satuanId`) REFERENCES `Satuan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HargaReferensi` ADD CONSTRAINT `HargaReferensi_tahunId_fkey` FOREIGN KEY (`tahunId`) REFERENCES `PeraturanTahunan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KegiatanASB` ADD CONSTRAINT `KegiatanASB_satuanId_fkey` FOREIGN KEY (`satuanId`) REFERENCES `Satuan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KegiatanASB` ADD CONSTRAINT `KegiatanASB_tahunId_fkey` FOREIGN KEY (`tahunId`) REFERENCES `PeraturanTahunan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KomponenASB` ADD CONSTRAINT `KomponenASB_kegiatanId_fkey` FOREIGN KEY (`kegiatanId`) REFERENCES `KegiatanASB`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KomponenASB` ADD CONSTRAINT `KomponenASB_kategoriId_fkey` FOREIGN KEY (`kategoriId`) REFERENCES `KategoriKomponen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KomponenASB` ADD CONSTRAINT `KomponenASB_satuanId_fkey` FOREIGN KEY (`satuanId`) REFERENCES `Satuan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
