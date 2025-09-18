/*
  Warnings:

  - You are about to alter the column `createdBy` on the `item_pengawasan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `updatedBy` on the `item_pengawasan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `createdBy` on the `jenis_pengawasan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `updatedBy` on the `jenis_pengawasan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `createdBy` on the `jenispenugasan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `updatedBy` on the `jenispenugasan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `createdBy` on the `kelompok_pengawasan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `updatedBy` on the `kelompok_pengawasan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `createdBy` on the `opd` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `updatedBy` on the `opd` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `createdBy` on the `penugasan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `updatedBy` on the `penugasan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `createdBy` on the `pkpt` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `updatedBy` on the `pkpt` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `item_pengawasan` MODIFY `createdBy` INTEGER NOT NULL,
    MODIFY `updatedBy` INTEGER NULL;

-- AlterTable
ALTER TABLE `jenis_pengawasan` MODIFY `createdBy` INTEGER NOT NULL,
    MODIFY `updatedBy` INTEGER NULL;

-- AlterTable
ALTER TABLE `jenispenugasan` MODIFY `createdBy` INTEGER NOT NULL,
    MODIFY `updatedBy` INTEGER NULL;

-- AlterTable
ALTER TABLE `kelompok_pengawasan` MODIFY `createdBy` INTEGER NOT NULL,
    MODIFY `updatedBy` INTEGER NULL;

-- AlterTable
ALTER TABLE `opd` MODIFY `createdBy` INTEGER NULL,
    MODIFY `updatedBy` INTEGER NULL;

-- AlterTable
ALTER TABLE `penugasan` MODIFY `createdBy` INTEGER NOT NULL,
    MODIFY `updatedBy` INTEGER NULL;

-- AlterTable
ALTER TABLE `pkpt` MODIFY `createdBy` INTEGER NOT NULL,
    MODIFY `updatedBy` INTEGER NULL;
