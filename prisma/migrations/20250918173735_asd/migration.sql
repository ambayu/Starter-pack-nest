/*
  Warnings:

  - You are about to drop the column `ketua_tim` on the `penugasan` table. All the data in the column will be lost.
  - You are about to drop the column `nomor_kartu` on the `penugasan` table. All the data in the column will be lost.
  - You are about to drop the column `pembantu_penanggung_jawab` on the `penugasan` table. All the data in the column will be lost.
  - You are about to drop the column `penanggung_jawab` on the `penugasan` table. All the data in the column will be lost.
  - You are about to drop the column `pengendali_teknis` on the `penugasan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `penugasan` DROP COLUMN `ketua_tim`,
    DROP COLUMN `nomor_kartu`,
    DROP COLUMN `pembantu_penanggung_jawab`,
    DROP COLUMN `penanggung_jawab`,
    DROP COLUMN `pengendali_teknis`;
