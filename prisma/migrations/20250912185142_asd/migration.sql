/*
  Warnings:

  - You are about to drop the column `kM4Id` on the `km4programkerja` table. All the data in the column will be lost.
  - You are about to drop the `km5` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rute_pelaporan` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `id_km4` on table `km4programkerja` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `km4programkerja` DROP FOREIGN KEY `KM4ProgramKerja_kM4Id_fkey`;

-- DropIndex
DROP INDEX `KM4ProgramKerja_kM4Id_fkey` ON `km4programkerja`;

-- AlterTable
ALTER TABLE `km4programkerja` DROP COLUMN `kM4Id`,
    MODIFY `id_km4` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `rincianpekerjaan` ADD COLUMN `item_pengawasanId` INTEGER NULL;

-- DropTable
DROP TABLE `km5`;

-- DropTable
DROP TABLE `rute_pelaporan`;

-- CreateTable
CREATE TABLE `Jenis_pengawasan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Jenis_pengawasan_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kelompok_pengawasan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Kelompok_pengawasan_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item_pengawasan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kelompok_pengawasan` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PKPT` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `area_pengawasan` VARCHAR(191) NOT NULL,
    `tujuan` VARCHAR(191) NOT NULL,
    `id_jenis_pengawasan` INTEGER NOT NULL,
    `ruang_lingkup` VARCHAR(191) NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Item_pengawasan` ADD CONSTRAINT `Item_pengawasan_id_kelompok_pengawasan_fkey` FOREIGN KEY (`id_kelompok_pengawasan`) REFERENCES `Kelompok_pengawasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PKPT` ADD CONSTRAINT `PKPT_id_jenis_pengawasan_fkey` FOREIGN KEY (`id_jenis_pengawasan`) REFERENCES `Jenis_pengawasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM4ProgramKerja` ADD CONSTRAINT `KM4ProgramKerja_id_km4_fkey` FOREIGN KEY (`id_km4`) REFERENCES `KM4`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
