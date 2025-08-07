-- CreateTable
CREATE TABLE `Kelompok_HSPK` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NOT NULL,
    `uraian` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Kelompok_HSPK_kode_key`(`kode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kegiatan_HSPK` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NULL,
    `uraian` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `id_kelompok_HSPK` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubKegiatan_HSPK` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NULL,
    `uraian` VARCHAR(191) NULL,
    `id_kegiatan_HSPK` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `id_kelompok_HSPK` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itemKegiatanHSPK` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_sub_kegiatan_HSPK` INTEGER NOT NULL,
    `uraian` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Komponen_HSPK` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_item_kegiatan_HSPK` INTEGER NOT NULL,
    `uraian` VARCHAR(191) NULL,
    `id_satuan` INTEGER NOT NULL,
    `koefisien` VARCHAR(191) NULL,
    `harga_satuan` VARCHAR(191) NULL,
    `jumlah_harga` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `id_kegiatan_HSPK` INTEGER NULL,
    `id_sub_kegiatan_HSPK` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Kegiatan_HSPK` ADD CONSTRAINT `Kegiatan_HSPK_id_kelompok_HSPK_fkey` FOREIGN KEY (`id_kelompok_HSPK`) REFERENCES `Kelompok_HSPK`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubKegiatan_HSPK` ADD CONSTRAINT `SubKegiatan_HSPK_id_kegiatan_HSPK_fkey` FOREIGN KEY (`id_kegiatan_HSPK`) REFERENCES `Kegiatan_HSPK`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubKegiatan_HSPK` ADD CONSTRAINT `SubKegiatan_HSPK_id_kelompok_HSPK_fkey` FOREIGN KEY (`id_kelompok_HSPK`) REFERENCES `Kelompok_HSPK`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itemKegiatanHSPK` ADD CONSTRAINT `itemKegiatanHSPK_id_sub_kegiatan_HSPK_fkey` FOREIGN KEY (`id_sub_kegiatan_HSPK`) REFERENCES `SubKegiatan_HSPK`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Komponen_HSPK` ADD CONSTRAINT `Komponen_HSPK_id_item_kegiatan_HSPK_fkey` FOREIGN KEY (`id_item_kegiatan_HSPK`) REFERENCES `itemKegiatanHSPK`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Komponen_HSPK` ADD CONSTRAINT `Komponen_HSPK_id_satuan_fkey` FOREIGN KEY (`id_satuan`) REFERENCES `Satuan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Komponen_HSPK` ADD CONSTRAINT `Komponen_HSPK_id_kegiatan_HSPK_fkey` FOREIGN KEY (`id_kegiatan_HSPK`) REFERENCES `Kegiatan_HSPK`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Komponen_HSPK` ADD CONSTRAINT `Komponen_HSPK_id_sub_kegiatan_HSPK_fkey` FOREIGN KEY (`id_sub_kegiatan_HSPK`) REFERENCES `SubKegiatan_HSPK`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
