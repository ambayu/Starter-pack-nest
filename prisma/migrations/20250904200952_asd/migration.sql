-- AlterTable
ALTER TABLE `penugasan` ADD COLUMN `id_jenis_penugasan` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `JenisPenugasan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jenis_penugasan` VARCHAR(191) NOT NULL,
    `area_penugasan` VARCHAR(191) NULL,
    `sifat_penugasan` VARCHAR(191) NULL,
    `jenis_pengawasan` VARCHAR(191) NULL,
    `alamat` VARCHAR(191) NULL,
    `nomor_telp` VARCHAR(191) NULL,
    `tujuan_penugasan` VARCHAR(191) NULL,
    `ruang_lingkup` VARCHAR(191) NULL,
    `tahun_penugasan` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `JenisPenugasan_jenis_penugasan_key`(`jenis_penugasan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Penugasan` ADD CONSTRAINT `Penugasan_id_jenis_penugasan_fkey` FOREIGN KEY (`id_jenis_penugasan`) REFERENCES `JenisPenugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
