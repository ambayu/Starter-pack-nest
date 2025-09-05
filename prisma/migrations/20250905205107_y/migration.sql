/*
  Warnings:

  - You are about to drop the column `id_pegawai` on the `km4auditor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `km4auditor` DROP FOREIGN KEY `km4Auditor_id_pegawai_fkey`;

-- DropIndex
DROP INDEX `km4Auditor_id_pegawai_fkey` ON `km4auditor`;

-- AlterTable
ALTER TABLE `km4auditor` DROP COLUMN `id_pegawai`;
