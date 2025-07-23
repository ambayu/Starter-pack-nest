-- CreateTable
CREATE TABLE `PeratuanTahunan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tahun` INTEGER NOT NULL,
    `peraturan` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PeratuanTahunan_tahun_key`(`tahun`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KategoriKomponen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `KategoriKomponen_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Satuan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Satuan_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HargaReferensi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `satuanId` INTEGER NOT NULL,
    `harga` INTEGER NOT NULL,
    `tahunId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KegiatanASB` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NOT NULL,
    `uraian` VARCHAR(191) NOT NULL,
    `satuanId` INTEGER NOT NULL,
    `tahunId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KomponenASB` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kegiatanId` INTEGER NOT NULL,
    `kategoriId` INTEGER NOT NULL,
    `uraian` VARCHAR(191) NOT NULL,
    `satuanId` INTEGER NOT NULL,
    `koefisien` DOUBLE NOT NULL,
    `hargaSatuan` INTEGER NOT NULL,
    `jumlahHarga` INTEGER NOT NULL,
    `urutan` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HargaReferensi` ADD CONSTRAINT `HargaReferensi_satuanId_fkey` FOREIGN KEY (`satuanId`) REFERENCES `Satuan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HargaReferensi` ADD CONSTRAINT `HargaReferensi_tahunId_fkey` FOREIGN KEY (`tahunId`) REFERENCES `PeratuanTahunan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KegiatanASB` ADD CONSTRAINT `KegiatanASB_satuanId_fkey` FOREIGN KEY (`satuanId`) REFERENCES `Satuan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KegiatanASB` ADD CONSTRAINT `KegiatanASB_tahunId_fkey` FOREIGN KEY (`tahunId`) REFERENCES `PeratuanTahunan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KomponenASB` ADD CONSTRAINT `KomponenASB_kegiatanId_fkey` FOREIGN KEY (`kegiatanId`) REFERENCES `KegiatanASB`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KomponenASB` ADD CONSTRAINT `KomponenASB_kategoriId_fkey` FOREIGN KEY (`kategoriId`) REFERENCES `KategoriKomponen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KomponenASB` ADD CONSTRAINT `KomponenASB_satuanId_fkey` FOREIGN KEY (`satuanId`) REFERENCES `Satuan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
