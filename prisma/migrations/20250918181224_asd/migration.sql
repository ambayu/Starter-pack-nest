/*
  Warnings:

  - You are about to drop the column `id_penugasan` on the `jenispenugasan` table. All the data in the column will be lost.
  - Added the required column `id_jenis_penugasan` to the `Penugasan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `jenispenugasan` DROP FOREIGN KEY `JenisPenugasan_id_penugasan_fkey`;

-- DropIndex
DROP INDEX `JenisPenugasan_id_penugasan_key` ON `jenispenugasan`;

-- AlterTable
ALTER TABLE `jenispenugasan` DROP COLUMN `id_penugasan`;

-- AlterTable
ALTER TABLE `penugasan` ADD COLUMN `id_jenis_penugasan` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Penugasan` ADD CONSTRAINT `Penugasan_id_jenis_penugasan_fkey` FOREIGN KEY (`id_jenis_penugasan`) REFERENCES `JenisPenugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
