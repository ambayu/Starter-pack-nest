/*
  Warnings:

  - You are about to drop the column `satuanId` on the `hargareferensi` table. All the data in the column will be lost.
  - You are about to drop the column `tahunId` on the `hargareferensi` table. All the data in the column will be lost.
  - You are about to drop the column `satuanId` on the `kegiatanasb` table. All the data in the column will be lost.
  - You are about to drop the column `tahunId` on the `kegiatanasb` table. All the data in the column will be lost.
  - You are about to drop the column `kategoriId` on the `komponenasb` table. All the data in the column will be lost.
  - You are about to drop the column `kegiatanId` on the `komponenasb` table. All the data in the column will be lost.
  - You are about to drop the column `satuanId` on the `komponenasb` table. All the data in the column will be lost.
  - Added the required column `id_satuan` to the `HargaReferensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tahun` to the `HargaReferensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_satuan` to the `KegiatanASB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tahun` to the `KegiatanASB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_kategori` to the `KomponenASB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_kegiatan` to the `KomponenASB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_satuan` to the `KomponenASB` table without a default value. This is not possible if the table is not empty.

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
ALTER TABLE `hargareferensi` DROP COLUMN `satuanId`,
    DROP COLUMN `tahunId`,
    ADD COLUMN `id_satuan` INTEGER NOT NULL,
    ADD COLUMN `id_tahun` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `kegiatanasb` DROP COLUMN `satuanId`,
    DROP COLUMN `tahunId`,
    ADD COLUMN `id_satuan` INTEGER NOT NULL,
    ADD COLUMN `id_tahun` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `komponenasb` DROP COLUMN `kategoriId`,
    DROP COLUMN `kegiatanId`,
    DROP COLUMN `satuanId`,
    ADD COLUMN `id_kategori` INTEGER NOT NULL,
    ADD COLUMN `id_kegiatan` INTEGER NOT NULL,
    ADD COLUMN `id_satuan` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `HargaReferensi` ADD CONSTRAINT `HargaReferensi_id_satuan_fkey` FOREIGN KEY (`id_satuan`) REFERENCES `Satuan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HargaReferensi` ADD CONSTRAINT `HargaReferensi_id_tahun_fkey` FOREIGN KEY (`id_tahun`) REFERENCES `PeraturanTahunan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KegiatanASB` ADD CONSTRAINT `KegiatanASB_id_satuan_fkey` FOREIGN KEY (`id_satuan`) REFERENCES `Satuan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KegiatanASB` ADD CONSTRAINT `KegiatanASB_id_tahun_fkey` FOREIGN KEY (`id_tahun`) REFERENCES `PeraturanTahunan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KomponenASB` ADD CONSTRAINT `KomponenASB_id_kegiatan_fkey` FOREIGN KEY (`id_kegiatan`) REFERENCES `KegiatanASB`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KomponenASB` ADD CONSTRAINT `KomponenASB_id_kategori_fkey` FOREIGN KEY (`id_kategori`) REFERENCES `KategoriKomponen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KomponenASB` ADD CONSTRAINT `KomponenASB_id_satuan_fkey` FOREIGN KEY (`id_satuan`) REFERENCES `Satuan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
