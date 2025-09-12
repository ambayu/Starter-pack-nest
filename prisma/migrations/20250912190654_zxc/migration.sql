-- DropIndex
DROP INDEX `Jenis_pengawasan_name_key` ON `jenis_pengawasan`;

-- AlterTable
ALTER TABLE `jenis_pengawasan` MODIFY `name` VARCHAR(191) NULL;
