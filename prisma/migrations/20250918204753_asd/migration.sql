/*
  Warnings:

  - You are about to drop the column `userId` on the `jenispenugasan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `jenispenugasan` DROP FOREIGN KEY `JenisPenugasan_userId_fkey`;

-- DropIndex
DROP INDEX `JenisPenugasan_userId_fkey` ON `jenispenugasan`;

-- AlterTable
ALTER TABLE `jenispenugasan` DROP COLUMN `userId`;
