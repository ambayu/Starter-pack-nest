-- CreateTable
CREATE TABLE `km5` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pelaporan` INTEGER NOT NULL,
    `komentar` VARCHAR(191) NULL,
    `index_kka` VARCHAR(191) NULL,
    `penyelesaian` VARCHAR(191) NULL,
    `persetujuan` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `km6` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pelaporan` INTEGER NOT NULL,
    `uraian` VARCHAR(191) NULL,
    `nama` VARCHAR(191) NULL,
    `tanggal_1` VARCHAR(191) NULL,
    `tanggal_2` VARCHAR(191) NULL,
    `tanggal_3` VARCHAR(191) NULL,
    `tanggal_4` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `km7` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pelaporan` INTEGER NOT NULL,
    `halaman_lhr` VARCHAR(191) NULL,
    `masalah` VARCHAR(191) NULL,
    `nomor_kkr` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `km8` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pelaporan` INTEGER NOT NULL,
    `kondisi` VARCHAR(191) NULL,
    `kriteria` VARCHAR(191) NULL,
    `sebab` VARCHAR(191) NULL,
    `akibat` VARCHAR(191) NULL,
    `rekomendasi` VARCHAR(191) NULL,
    `rencana_tindak_lanjut` VARCHAR(191) NULL,
    `komentar_auditi` VARCHAR(191) NULL,
    `komentar_auditor` VARCHAR(191) NULL,
    `ket` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `km5` ADD CONSTRAINT `km5_id_pelaporan_fkey` FOREIGN KEY (`id_pelaporan`) REFERENCES `pelaporan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km6` ADD CONSTRAINT `km6_id_pelaporan_fkey` FOREIGN KEY (`id_pelaporan`) REFERENCES `pelaporan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km7` ADD CONSTRAINT `km7_id_pelaporan_fkey` FOREIGN KEY (`id_pelaporan`) REFERENCES `pelaporan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km8` ADD CONSTRAINT `km8_id_pelaporan_fkey` FOREIGN KEY (`id_pelaporan`) REFERENCES `pelaporan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
