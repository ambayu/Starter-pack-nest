/*
  Warnings:

  - You are about to drop the column `alamat` on the `jenispenugasan` table. All the data in the column will be lost.
  - You are about to drop the column `area_penugasan` on the `jenispenugasan` table. All the data in the column will be lost.
  - You are about to drop the column `jenis_pengawasan` on the `jenispenugasan` table. All the data in the column will be lost.
  - You are about to drop the column `nomor_telp` on the `jenispenugasan` table. All the data in the column will be lost.
  - You are about to drop the column `ruang_lingkup` on the `jenispenugasan` table. All the data in the column will be lost.
  - You are about to drop the column `sifat_penugasan` on the `jenispenugasan` table. All the data in the column will be lost.
  - You are about to drop the column `tahun_penugasan` on the `jenispenugasan` table. All the data in the column will be lost.
  - You are about to drop the column `tujuan_penugasan` on the `jenispenugasan` table. All the data in the column will be lost.
  - Added the required column `id_pkpt` to the `JenisPenugasan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `non_pkpt` to the `JenisPenugasan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `jenispenugasan` DROP COLUMN `alamat`,
    DROP COLUMN `area_penugasan`,
    DROP COLUMN `jenis_pengawasan`,
    DROP COLUMN `nomor_telp`,
    DROP COLUMN `ruang_lingkup`,
    DROP COLUMN `sifat_penugasan`,
    DROP COLUMN `tahun_penugasan`,
    DROP COLUMN `tujuan_penugasan`,
    ADD COLUMN `id_pkpt` INTEGER NOT NULL,
    ADD COLUMN `non_pkpt` JSON NOT NULL;

-- AddForeignKey
ALTER TABLE `JenisPenugasan` ADD CONSTRAINT `JenisPenugasan_id_pkpt_fkey` FOREIGN KEY (`id_pkpt`) REFERENCES `PKPT`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
