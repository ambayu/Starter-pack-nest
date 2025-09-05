-- CreateTable
CREATE TABLE `KM3Peran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_km3` INTEGER NOT NULL,
    `id_peran` INTEGER NOT NULL,
    `rencana_jam` DOUBLE NULL,
    `realisasi_jam` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `KM3Peran` ADD CONSTRAINT `KM3Peran_id_km3_fkey` FOREIGN KEY (`id_km3`) REFERENCES `KM3`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM3Peran` ADD CONSTRAINT `KM3Peran_id_peran_fkey` FOREIGN KEY (`id_peran`) REFERENCES `Peran`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
