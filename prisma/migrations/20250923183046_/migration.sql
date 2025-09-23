/*
  Warnings:

  - You are about to drop the column `id_status` on the `penugasan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `penugasan` DROP COLUMN `id_status`,
    ADD COLUMN `alasan_penolakan` VARCHAR(191) NULL,
    ADD COLUMN `id_status_penugasan` INTEGER NULL;
