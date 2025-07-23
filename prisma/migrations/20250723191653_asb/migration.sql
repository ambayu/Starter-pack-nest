/*
  Warnings:

  - You are about to drop the column `id_kategori` on the `komponen_asb` table. All the data in the column will be lost.
  - You are about to drop the column `id_kegiatan` on the `komponen_asb` table. All the data in the column will be lost.
  - Added the required column `id_kategori_komponen` to the `Komponen_ASB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_kegiatan_asb` to the `Komponen_ASB` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `komponen_asb` DROP FOREIGN KEY `Komponen_ASB_id_kategori_fkey`;

-- DropForeignKey
ALTER TABLE `komponen_asb` DROP FOREIGN KEY `Komponen_ASB_id_kegiatan_fkey`;

-- DropIndex
DROP INDEX `Komponen_ASB_id_kategori_fkey` ON `komponen_asb`;

-- DropIndex
DROP INDEX `Komponen_ASB_id_kegiatan_fkey` ON `komponen_asb`;

-- AlterTable
ALTER TABLE `komponen_asb` DROP COLUMN `id_kategori`,
    DROP COLUMN `id_kegiatan`,
    ADD COLUMN `id_kategori_komponen` INTEGER NOT NULL,
    ADD COLUMN `id_kegiatan_asb` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Komponen_ASB` ADD CONSTRAINT `Komponen_ASB_id_kegiatan_asb_fkey` FOREIGN KEY (`id_kegiatan_asb`) REFERENCES `Kegiatan_ASB`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Komponen_ASB` ADD CONSTRAINT `Komponen_ASB_id_kategori_komponen_fkey` FOREIGN KEY (`id_kategori_komponen`) REFERENCES `Kategori_Komponen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
