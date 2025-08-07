/*
  Warnings:

  - A unique constraint covering the columns `[kode]` on the table `Kelompok_ASB` will be added. If there are existing duplicate values, this will fail.
  - Made the column `kode` on table `kelompok_asb` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `kelompok_asb` MODIFY `kode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Kelompok_ASB_kode_key` ON `Kelompok_ASB`(`kode`);
