/*
  Warnings:

  - You are about to drop the column `id_penugasan` on the `jenispenugasan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `jenispenugasan` DROP FOREIGN KEY `JenisPenugasan_id_penugasan_fkey`;

-- DropIndex
DROP INDEX `JenisPenugasan_id_penugasan_fkey` ON `jenispenugasan`;

-- AlterTable
ALTER TABLE `jenispenugasan` DROP COLUMN `id_penugasan`;

-- AlterTable
ALTER TABLE `penugasan` ADD COLUMN `id_jenis_penugasan` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `Penugasan` ADD CONSTRAINT `Penugasan_id_jenis_penugasan_fkey` FOREIGN KEY (`id_jenis_penugasan`) REFERENCES `JenisPenugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
