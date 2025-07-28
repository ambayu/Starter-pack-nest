/*
  Warnings:

  - You are about to drop the column `hargaSatuan` on the `komponen_asb` table. All the data in the column will be lost.
  - You are about to drop the column `jumlahHarga` on the `komponen_asb` table. All the data in the column will be lost.
  - Added the required column `harga_satuan` to the `Komponen_ASB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jumlah_harga` to the `Komponen_ASB` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `komponen_asb` DROP COLUMN `hargaSatuan`,
    DROP COLUMN `jumlahHarga`,
    ADD COLUMN `harga_satuan` INTEGER NOT NULL,
    ADD COLUMN `jumlah_harga` INTEGER NOT NULL;
