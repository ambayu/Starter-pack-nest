/*
  Warnings:

  - You are about to drop the column `nomor_kartu` on the `km1` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `km1` DROP COLUMN `nomor_kartu`;

-- AlterTable
ALTER TABLE `penugasan` ADD COLUMN `nomor_kartu` VARCHAR(191) NULL;
