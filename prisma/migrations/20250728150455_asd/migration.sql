/*
  Warnings:

  - You are about to alter the column `harga_satuan` on the `komponen_asb` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `jumlah_harga` on the `komponen_asb` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `komponen_asb` MODIFY `harga_satuan` DECIMAL(65, 30) NOT NULL,
    MODIFY `jumlah_harga` DECIMAL(65, 30) NOT NULL;
