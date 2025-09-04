/*
  Warnings:

  - You are about to drop the column `nama_penangggung` on the `ruteperencanaan` table. All the data in the column will be lost.
  - Added the required column `nama_penanggung` to the `RutePerencanaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ruteperencanaan` DROP COLUMN `nama_penangggung`,
    ADD COLUMN `nama_penanggung` VARCHAR(191) NOT NULL;
