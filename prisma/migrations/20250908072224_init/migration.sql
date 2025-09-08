-- CreateTable
CREATE TABLE `Rute_Pelaporan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KM5` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `permasalahan` VARCHAR(191) NOT NULL,
    `index_kka` VARCHAR(191) NOT NULL,
    `penyelesaian` VARCHAR(191) NOT NULL,
    `persetujuan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
