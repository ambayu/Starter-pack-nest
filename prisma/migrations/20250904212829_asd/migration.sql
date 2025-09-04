/*
  Warnings:

  - You are about to drop the column `createdBy` on the `penugasan` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `penugasan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `penugasan` DROP COLUMN `createdBy`,
    DROP COLUMN `updatedBy`;
