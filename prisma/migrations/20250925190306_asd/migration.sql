/*
  Warnings:

  - You are about to drop the column `nama_penanggung` on the `urutan_pekerjaan_pelaporan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pelaporan` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `createdBy` INTEGER NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedBy` INTEGER NULL;

-- AlterTable
ALTER TABLE `urutan_pekerjaan_pelaporan` DROP COLUMN `nama_penanggung`,
    ADD COLUMN `id_user_penanggung` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `urutan_pekerjaan_pelaporan` ADD CONSTRAINT `urutan_pekerjaan_pelaporan_id_user_penanggung_fkey` FOREIGN KEY (`id_user_penanggung`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
