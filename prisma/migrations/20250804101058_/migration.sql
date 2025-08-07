/*
  Warnings:

  - You are about to alter the column `koefisien` on the `komponen_asb` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `harga_satuan` on the `komponen_asb` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `jumlah_harga` on the `komponen_asb` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `komponen_asb` MODIFY `koefisien` VARCHAR(191) NULL,
    MODIFY `harga_satuan` VARCHAR(191) NULL,
    MODIFY `jumlah_harga` VARCHAR(191) NULL;
