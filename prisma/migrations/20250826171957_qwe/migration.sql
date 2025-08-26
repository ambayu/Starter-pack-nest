-- AddForeignKey
ALTER TABLE `KM2RincianPekerjaan` ADD CONSTRAINT `KM2RincianPekerjaan_id_jenis_pekerjaan_fkey` FOREIGN KEY (`id_jenis_pekerjaan`) REFERENCES `jenisPekerjaan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
