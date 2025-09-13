-- AlterTable
ALTER TABLE `kelompok_pengawasan` ADD COLUMN `id_jenis_pengawasan` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `Kelompok_pengawasan` ADD CONSTRAINT `Kelompok_pengawasan_id_jenis_pengawasan_fkey` FOREIGN KEY (`id_jenis_pengawasan`) REFERENCES `Jenis_pengawasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
