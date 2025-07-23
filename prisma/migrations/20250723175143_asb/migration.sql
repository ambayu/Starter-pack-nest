/*
  Warnings:

  - You are about to drop the `hargareferensi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kategorikomponen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kegiatanasb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `komponenasb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `peraturantahunan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `hargareferensi` DROP FOREIGN KEY `HargaReferensi_id_satuan_fkey`;

-- DropForeignKey
ALTER TABLE `hargareferensi` DROP FOREIGN KEY `HargaReferensi_id_tahun_fkey`;

-- DropForeignKey
ALTER TABLE `kegiatanasb` DROP FOREIGN KEY `KegiatanASB_id_satuan_fkey`;

-- DropForeignKey
ALTER TABLE `kegiatanasb` DROP FOREIGN KEY `KegiatanASB_id_tahun_fkey`;

-- DropForeignKey
ALTER TABLE `komponenasb` DROP FOREIGN KEY `KomponenASB_id_kategori_fkey`;

-- DropForeignKey
ALTER TABLE `komponenasb` DROP FOREIGN KEY `KomponenASB_id_kegiatan_fkey`;

-- DropForeignKey
ALTER TABLE `komponenasb` DROP FOREIGN KEY `KomponenASB_id_satuan_fkey`;

-- DropTable
DROP TABLE `hargareferensi`;

-- DropTable
DROP TABLE `kategorikomponen`;

-- DropTable
DROP TABLE `kegiatanasb`;

-- DropTable
DROP TABLE `komponenasb`;

-- DropTable
DROP TABLE `peraturantahunan`;

-- CreateTable
CREATE TABLE `Peraturan_Tahunan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tahun` INTEGER NOT NULL,
    `peraturan` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Peraturan_Tahunan_tahun_key`(`tahun`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategori_Komponen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Kategori_Komponen_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Harga_Referensi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `id_satuan` INTEGER NOT NULL,
    `harga` INTEGER NOT NULL,
    `id_tahun` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kegiatan_ASB` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NOT NULL,
    `uraian` VARCHAR(191) NOT NULL,
    `id_satuan` INTEGER NOT NULL,
    `id_tahun` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Komponen_ASB` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kegiatan` INTEGER NOT NULL,
    `id_kategori` INTEGER NOT NULL,
    `uraian` VARCHAR(191) NOT NULL,
    `id_satuan` INTEGER NOT NULL,
    `koefisien` DOUBLE NOT NULL,
    `hargaSatuan` INTEGER NOT NULL,
    `jumlahHarga` INTEGER NOT NULL,
    `urutan` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Harga_Referensi` ADD CONSTRAINT `Harga_Referensi_id_satuan_fkey` FOREIGN KEY (`id_satuan`) REFERENCES `Satuan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Harga_Referensi` ADD CONSTRAINT `Harga_Referensi_id_tahun_fkey` FOREIGN KEY (`id_tahun`) REFERENCES `Peraturan_Tahunan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kegiatan_ASB` ADD CONSTRAINT `Kegiatan_ASB_id_satuan_fkey` FOREIGN KEY (`id_satuan`) REFERENCES `Satuan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kegiatan_ASB` ADD CONSTRAINT `Kegiatan_ASB_id_tahun_fkey` FOREIGN KEY (`id_tahun`) REFERENCES `Peraturan_Tahunan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Komponen_ASB` ADD CONSTRAINT `Komponen_ASB_id_kegiatan_fkey` FOREIGN KEY (`id_kegiatan`) REFERENCES `Kegiatan_ASB`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Komponen_ASB` ADD CONSTRAINT `Komponen_ASB_id_kategori_fkey` FOREIGN KEY (`id_kategori`) REFERENCES `Kategori_Komponen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Komponen_ASB` ADD CONSTRAINT `Komponen_ASB_id_satuan_fkey` FOREIGN KEY (`id_satuan`) REFERENCES `Satuan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
