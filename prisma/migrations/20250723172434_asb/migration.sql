/*
  Warnings:

  - You are about to drop the `peratuantahunan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `hargareferensi` DROP FOREIGN KEY `HargaReferensi_tahunId_fkey`;

-- DropForeignKey
ALTER TABLE `kegiatanasb` DROP FOREIGN KEY `KegiatanASB_tahunId_fkey`;

-- DropIndex
DROP INDEX `HargaReferensi_tahunId_fkey` ON `hargareferensi`;

-- DropIndex
DROP INDEX `KegiatanASB_tahunId_fkey` ON `kegiatanasb`;

-- DropTable
DROP TABLE `peratuantahunan`;

-- CreateTable
CREATE TABLE `PeraturanTahunan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tahun` INTEGER NOT NULL,
    `peraturan` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PeraturanTahunan_tahun_key`(`tahun`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HargaReferensi` ADD CONSTRAINT `HargaReferensi_tahunId_fkey` FOREIGN KEY (`tahunId`) REFERENCES `PeraturanTahunan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KegiatanASB` ADD CONSTRAINT `KegiatanASB_tahunId_fkey` FOREIGN KEY (`tahunId`) REFERENCES `PeraturanTahunan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
