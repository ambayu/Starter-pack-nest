/*
  Warnings:

  - You are about to drop the column `id_penugasan` on the `pelaporan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `pelaporan` DROP FOREIGN KEY `pelaporan_id_penugasan_fkey`;

-- DropIndex
DROP INDEX `pelaporan_id_penugasan_fkey` ON `pelaporan`;

-- AlterTable
ALTER TABLE `pelaporan` DROP COLUMN `id_penugasan`,
    ADD COLUMN `id_jenis_penugasan` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `pelaporan` ADD CONSTRAINT `pelaporan_id_jenis_penugasan_fkey` FOREIGN KEY (`id_jenis_penugasan`) REFERENCES `jenis_penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
