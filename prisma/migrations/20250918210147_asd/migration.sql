-- DropForeignKey
ALTER TABLE `penugasan` DROP FOREIGN KEY `Penugasan_createdBy_fkey`;

-- DropIndex
DROP INDEX `Penugasan_createdBy_fkey` ON `penugasan`;

-- AlterTable
ALTER TABLE `penugasan` MODIFY `createdBy` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Penugasan` ADD CONSTRAINT `Penugasan_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
