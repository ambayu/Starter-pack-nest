/*
  Warnings:

  - You are about to drop the column `updated_at` on the `opd` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `Opd` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `opd` DROP COLUMN `updated_at`,
    ADD COLUMN `createdBy` DATETIME(3) NOT NULL,
    ADD COLUMN `updatedBy` VARCHAR(191) NULL;
