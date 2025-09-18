/*
  Warnings:

  - You are about to drop the column `id_jenis_penugasan` on the `penugasan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_penugasan]` on the table `JenisPenugasan` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `penugasan` DROP FOREIGN KEY `Penugasan_id_jenis_penugasan_fkey`;

-- DropIndex
DROP INDEX `Penugasan_id_jenis_penugasan_fkey` ON `penugasan`;

-- AlterTable
ALTER TABLE `jenispenugasan` ADD COLUMN `id_penugasan` INTEGER NULL;

-- AlterTable
ALTER TABLE `penugasan` DROP COLUMN `id_jenis_penugasan`;

-- CreateIndex
CREATE UNIQUE INDEX `JenisPenugasan_id_penugasan_key` ON `JenisPenugasan`(`id_penugasan`);

-- AddForeignKey
ALTER TABLE `JenisPenugasan` ADD CONSTRAINT `JenisPenugasan_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `Penugasan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
