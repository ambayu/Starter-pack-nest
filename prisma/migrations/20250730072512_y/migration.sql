-- AlterTable
ALTER TABLE `kegiatan_asb` MODIFY `kode` VARCHAR(191) NULL,
    MODIFY `uraian` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `komponen_asb` MODIFY `uraian` VARCHAR(191) NULL,
    MODIFY `koefisien` DOUBLE NULL,
    MODIFY `harga_satuan` DECIMAL(65, 30) NULL,
    MODIFY `jumlah_harga` DECIMAL(65, 30) NULL;
