/*
  Warnings:

  - You are about to drop the column `tgl_ttd_ptj` on the `km1` table. All the data in the column will be lost.
  - You are about to drop the column `ttd__ptj` on the `km1` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `km1` DROP FOREIGN KEY `KM1_ttd__ptj_fkey`;

-- DropIndex
DROP INDEX `KM1_ttd__ptj_fkey` ON `km1`;

-- AlterTable
ALTER TABLE `km1` DROP COLUMN `tgl_ttd_ptj`,
    DROP COLUMN `ttd__ptj`,
    ADD COLUMN `tgl_ttd_pt` DATETIME(3) NULL,
    ADD COLUMN `ttd_pt` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `KM1` ADD CONSTRAINT `KM1_ttd_pt_fkey` FOREIGN KEY (`ttd_pt`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
