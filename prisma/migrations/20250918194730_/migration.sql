/*
  Warnings:

  - A unique constraint covering the columns `[nip]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_nip_key` ON `User`(`nip`);

-- AddForeignKey
ALTER TABLE `SusunanTim` ADD CONSTRAINT `SusunanTim_nip_fkey` FOREIGN KEY (`nip`) REFERENCES `User`(`nip`) ON DELETE CASCADE ON UPDATE CASCADE;
