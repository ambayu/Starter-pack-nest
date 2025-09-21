/*
  Warnings:

  - You are about to drop the column `id_tujuan` on the `km4programkerja` table. All the data in the column will be lost.
  - You are about to drop the `km4tujuan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_km4` to the `KM4ProgramKerja` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `km4programkerja` DROP FOREIGN KEY `KM4ProgramKerja_id_tujuan_fkey`;

-- DropForeignKey
ALTER TABLE `km4tujuan` DROP FOREIGN KEY `KM4Tujuan_id_km4_fkey`;

-- DropIndex
DROP INDEX `KM4ProgramKerja_id_tujuan_fkey` ON `km4programkerja`;

-- AlterTable
ALTER TABLE `km4` ADD COLUMN `tujuan` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `km4programkerja` DROP COLUMN `id_tujuan`,
    ADD COLUMN `id_km4` INTEGER NOT NULL;

-- DropTable
DROP TABLE `km4tujuan`;

-- AddForeignKey
ALTER TABLE `KM4ProgramKerja` ADD CONSTRAINT `KM4ProgramKerja_id_km4_fkey` FOREIGN KEY (`id_km4`) REFERENCES `KM4`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
