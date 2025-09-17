-- AlterTable
ALTER TABLE `biodata` ADD COLUMN `jabatan` VARCHAR(191) NULL,
    ADD COLUMN `pangkat` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `nip` VARCHAR(191) NULL;
