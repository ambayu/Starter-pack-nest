-- AlterTable
ALTER TABLE `km1` ADD COLUMN `tgl_ttd_katim` DATETIME(3) NULL,
    ADD COLUMN `tgl_ttd_ppj` DATETIME(3) NULL,
    ADD COLUMN `tgl_ttd_ptj` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `km2` ADD COLUMN `tgl_ttd_kasubag_umum` DATETIME(3) NULL,
    ADD COLUMN `tgl_ttd_ppj` DATETIME(3) NULL,
    ADD COLUMN `tgl_ttd_sekretaris` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `km3` ADD COLUMN `tgl_ttd_katim` DATETIME(3) NULL,
    ADD COLUMN `tgl_ttd_pt` DATETIME(3) NULL;
