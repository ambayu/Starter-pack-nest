/*
  Warnings:

  - You are about to drop the column `nama` on the `km6` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `km6` DROP COLUMN `nama`,
    ADD COLUMN `id_user_penanggung` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `km6` ADD CONSTRAINT `km6_id_user_penanggung_fkey` FOREIGN KEY (`id_user_penanggung`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
