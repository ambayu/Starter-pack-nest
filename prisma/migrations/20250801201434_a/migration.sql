/*
  Warnings:

  - You are about to drop the column `kode` on the `itemkegiatanasb` table. All the data in the column will be lost.
  - Added the required column `id_sub_kegiatan_asb` to the `itemKegiatanASB` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `itemkegiatanasb` DROP COLUMN `kode`,
    ADD COLUMN `id_sub_kegiatan_asb` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `itemKegiatanASB` ADD CONSTRAINT `itemKegiatanASB_id_sub_kegiatan_asb_fkey` FOREIGN KEY (`id_sub_kegiatan_asb`) REFERENCES `SubKegiatan_ASB`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
