/*
  Warnings:

  - Made the column `createdBy` on table `penugasan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `penugasan` MODIFY `createdBy` VARCHAR(191) NOT NULL,
    MODIFY `updatedBy` VARCHAR(191) NULL;
