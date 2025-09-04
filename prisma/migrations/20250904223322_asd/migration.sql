/*
  Warnings:

  - You are about to drop the `km1susunantim` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `km1susunantim` DROP FOREIGN KEY `KM1SusunanTim_id_km1_fkey`;

-- DropForeignKey
ALTER TABLE `km1susunantim` DROP FOREIGN KEY `KM1SusunanTim_id_peran_fkey`;

-- DropTable
DROP TABLE `km1susunantim`;

-- CreateTable
CREATE TABLE `SusunanTim` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penugasan` INTEGER NOT NULL,
    `nip` VARCHAR(191) NOT NULL,
    `id_peran` INTEGER NULL,
    `satuan` VARCHAR(191) NULL,
    `honorarium` INTEGER NULL,
    `alokasi_anggaran` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SusunanTim` ADD CONSTRAINT `SusunanTim_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `Penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SusunanTim` ADD CONSTRAINT `SusunanTim_id_peran_fkey` FOREIGN KEY (`id_peran`) REFERENCES `Peran`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
