/*
  Warnings:

  - A unique constraint covering the columns `[kode]` on the table `Pelaksana` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Pelaksana_kode_key` ON `Pelaksana`(`kode`);
