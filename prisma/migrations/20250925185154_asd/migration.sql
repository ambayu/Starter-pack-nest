-- CreateTable
CREATE TABLE `pelaporan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penugasan` INTEGER NULL,
    `judul_pelaporan` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NULL,
    `periode` VARCHAR(191) NULL,
    `no_kp` VARCHAR(191) NULL,
    `tgl_kp` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `urutan_pekerjaan_pelaporan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `nama_penanggung` VARCHAR(191) NOT NULL,
    `id_pelaporan` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tanggal_urutan_pekerjaan_pelaporan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_urutan_pekerjaan_pelaporan` INTEGER NOT NULL,
    `tanggal_paraf` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pelaporan` ADD CONSTRAINT `pelaporan_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `urutan_pekerjaan_pelaporan` ADD CONSTRAINT `urutan_pekerjaan_pelaporan_id_pelaporan_fkey` FOREIGN KEY (`id_pelaporan`) REFERENCES `pelaporan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tanggal_urutan_pekerjaan_pelaporan` ADD CONSTRAINT `tanggal_urutan_pekerjaan_pelaporan_id_urutan_pekerjaan_pela_fkey` FOREIGN KEY (`id_urutan_pekerjaan_pelaporan`) REFERENCES `urutan_pekerjaan_pelaporan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
