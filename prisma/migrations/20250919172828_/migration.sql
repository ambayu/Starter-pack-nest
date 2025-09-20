/*
  Warnings:

  - You are about to drop the column `status` on the `penugasan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `jenispenugasan` ADD COLUMN `id_status` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `penugasan` DROP COLUMN `status`,
    ADD COLUMN `id_status` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `status` MODIFY `name` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `JenisPenugasan` ADD CONSTRAINT `JenisPenugasan_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
