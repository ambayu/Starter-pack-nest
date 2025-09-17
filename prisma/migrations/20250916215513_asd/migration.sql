/*
  Warnings:

  - You are about to drop the column `id_km4` on the `km4programkerja` table. All the data in the column will be lost.
  - Added the required column `id_tujuan` to the `KM4ProgramKerja` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `km4auditors` DROP FOREIGN KEY `km4Auditors_id_km4_program_kerja_fkey`;

-- DropForeignKey
ALTER TABLE `km4programkerja` DROP FOREIGN KEY `KM4ProgramKerja_id_km4_fkey`;

-- DropIndex
DROP INDEX `KM4ProgramKerja_id_km4_fkey` ON `km4programkerja`;

-- AlterTable
ALTER TABLE `km4programkerja` DROP COLUMN `id_km4`,
    ADD COLUMN `id_tujuan` INTEGER NOT NULL,
    MODIFY `no_kka` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `KM4Tujuan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deskripsi` VARCHAR(191) NOT NULL,
    `id_km4` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `KM4Tujuan` ADD CONSTRAINT `KM4Tujuan_id_km4_fkey` FOREIGN KEY (`id_km4`) REFERENCES `KM4`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM4ProgramKerja` ADD CONSTRAINT `KM4ProgramKerja_id_tujuan_fkey` FOREIGN KEY (`id_tujuan`) REFERENCES `KM4Tujuan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM4Auditors` ADD CONSTRAINT `KM4Auditors_id_km4_program_kerja_fkey` FOREIGN KEY (`id_km4_program_kerja`) REFERENCES `KM4ProgramKerja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
