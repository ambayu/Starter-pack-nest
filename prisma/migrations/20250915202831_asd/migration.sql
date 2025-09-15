/*
  Warnings:

  - You are about to drop the column `id_rincian_pekerjaan` on the `km2rincianpekerjaan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `km2rincianpekerjaan` DROP FOREIGN KEY `KM2RincianPekerjaan_id_rincian_pekerjaan_fkey`;

-- DropIndex
DROP INDEX `KM2RincianPekerjaan_id_rincian_pekerjaan_fkey` ON `km2rincianpekerjaan`;

-- AlterTable
ALTER TABLE `km1` MODIFY `rencana_penugasan` VARCHAR(191) NULL,
    MODIFY `tahun_penugasan_terakhir` INTEGER NULL,
    MODIFY `alamat` VARCHAR(191) NULL,
    MODIFY `tingkat_risiko` VARCHAR(191) NULL,
    MODIFY `tujuan_penugasan` VARCHAR(191) NULL,
    MODIFY `rencana_mulai` DATETIME(3) NULL,
    MODIFY `rencana_selesai` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `km2rincianpekerjaan` DROP COLUMN `id_rincian_pekerjaan`,
    ADD COLUMN `id_item_pengawasan` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `rincianPekerjaanId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `KM2RincianPekerjaan` ADD CONSTRAINT `KM2RincianPekerjaan_id_item_pengawasan_fkey` FOREIGN KEY (`id_item_pengawasan`) REFERENCES `Item_pengawasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM2RincianPekerjaan` ADD CONSTRAINT `KM2RincianPekerjaan_rincianPekerjaanId_fkey` FOREIGN KEY (`rincianPekerjaanId`) REFERENCES `RincianPekerjaan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
