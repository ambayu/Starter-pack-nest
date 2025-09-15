/*
  Warnings:

  - You are about to drop the column `id_jenis_penugasan` on the `penugasan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `penugasan` DROP FOREIGN KEY `Penugasan_id_jenis_penugasan_fkey`;

-- DropIndex
DROP INDEX `Penugasan_id_jenis_penugasan_fkey` ON `penugasan`;

-- AlterTable
ALTER TABLE `jenispenugasan` ADD COLUMN `id_penugasan` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `penugasan` DROP COLUMN `id_jenis_penugasan`;

-- AddForeignKey
ALTER TABLE `JenisPenugasan` ADD CONSTRAINT `JenisPenugasan_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `Penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
