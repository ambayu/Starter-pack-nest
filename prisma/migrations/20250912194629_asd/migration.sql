-- DropIndex
DROP INDEX `Kelompok_pengawasan_name_key` ON `kelompok_pengawasan`;

-- AlterTable
ALTER TABLE `item_pengawasan` ADD COLUMN `deletedAt` DATETIME(3) NULL;
