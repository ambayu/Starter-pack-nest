/*
  Warnings:

  - You are about to drop the column `id_kegiatan_asb` on the `komponen_asb` table. All the data in the column will be lost.
  - Added the required column `id_sub_kegiatan_asb` to the `Komponen_ASB` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `komponen_asb` DROP FOREIGN KEY `Komponen_ASB_id_kegiatan_asb_fkey`;

-- DropIndex
DROP INDEX `Komponen_ASB_id_kegiatan_asb_fkey` ON `komponen_asb`;

-- AlterTable
ALTER TABLE `komponen_asb` DROP COLUMN `id_kegiatan_asb`,
    ADD COLUMN `id_sub_kegiatan_asb` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Komponen_ASB` ADD CONSTRAINT `Komponen_ASB_id_sub_kegiatan_asb_fkey` FOREIGN KEY (`id_sub_kegiatan_asb`) REFERENCES `SubKegiatan_ASB`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
