/*
  Warnings:

  - You are about to drop the column `surat_tugas_nomor` on the `km1` table. All the data in the column will be lost.
  - You are about to drop the `pegawai` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `km1` DROP COLUMN `surat_tugas_nomor`;

-- DropTable
DROP TABLE `pegawai`;
