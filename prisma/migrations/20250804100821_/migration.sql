/*
  Warnings:

  - You are about to alter the column `harga_satuan` on the `komponen_asb` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `jumlah_harga` on the `komponen_asb` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `komponen_asb` MODIFY `harga_satuan` DOUBLE NULL,
    MODIFY `jumlah_harga` DOUBLE NULL;
