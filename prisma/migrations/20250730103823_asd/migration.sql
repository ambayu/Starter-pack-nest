/*
  Warnings:

  - Added the required column `id_kegiatan_asb` to the `Komponen_ASB` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `komponen_asb` ADD COLUMN `id_kegiatan_asb` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Komponen_ASB` ADD CONSTRAINT `Komponen_ASB_id_kegiatan_asb_fkey` FOREIGN KEY (`id_kegiatan_asb`) REFERENCES `Kegiatan_ASB`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
