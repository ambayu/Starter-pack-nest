/*
  Warnings:

  - You are about to drop the column `no_urutan` on the `ruteperencanaan` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `JenisPenugasan` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `JenisPenugasan_jenis_penugasan_key` ON `jenispenugasan`;

-- AlterTable
ALTER TABLE `jenispenugasan` ADD COLUMN `createdBy` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedBy` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ruteperencanaan` DROP COLUMN `no_urutan`,
    MODIFY `tanggal_paraf` DATETIME(3) NULL;
