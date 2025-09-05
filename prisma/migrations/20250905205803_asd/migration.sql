/*
  Warnings:

  - You are about to drop the column `anggaran_waktu` on the `km4` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `km4` table. All the data in the column will be lost.
  - You are about to drop the column `no_kka` on the `km4` table. All the data in the column will be lost.
  - You are about to drop the column `prosedur` on the `km4` table. All the data in the column will be lost.
  - You are about to drop the column `realisasi_waktu` on the `km4` table. All the data in the column will be lost.
  - You are about to drop the column `tujuan` on the `km4` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `km4` table. All the data in the column will be lost.
  - You are about to drop the `km4auditor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `km4` DROP FOREIGN KEY `km4_id_penugasan_fkey`;

-- DropForeignKey
ALTER TABLE `km4auditor` DROP FOREIGN KEY `km4Auditor_id_km4_fkey`;

-- AlterTable
ALTER TABLE `km4` DROP COLUMN `anggaran_waktu`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `no_kka`,
    DROP COLUMN `prosedur`,
    DROP COLUMN `realisasi_waktu`,
    DROP COLUMN `tujuan`,
    DROP COLUMN `updatedAt`;

-- DropTable
DROP TABLE `km4auditor`;

-- CreateTable
CREATE TABLE `KM4ProgramKerja` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prosedur` VARCHAR(191) NOT NULL,
    `anggaran_waktu` INTEGER NOT NULL,
    `realisasi_waktu` INTEGER NOT NULL,
    `no_kka` VARCHAR(191) NOT NULL,
    `id_km4` INTEGER NULL,
    `kM4Id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `km4Auditors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_km4_program_kerja` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `KM4` ADD CONSTRAINT `KM4_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `Penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM4ProgramKerja` ADD CONSTRAINT `KM4ProgramKerja_kM4Id_fkey` FOREIGN KEY (`kM4Id`) REFERENCES `KM4`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km4Auditors` ADD CONSTRAINT `km4Auditors_id_km4_program_kerja_fkey` FOREIGN KEY (`id_km4_program_kerja`) REFERENCES `KM4ProgramKerja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
