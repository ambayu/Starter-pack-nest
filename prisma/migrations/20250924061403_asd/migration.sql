-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(191) NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_nip_key`(`nip`),
    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `opd` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NOT NULL,
    `id_skpd` INTEGER NOT NULL,
    `id_skpd_parent` INTEGER NULL,
    `skpd_parent` VARCHAR(191) NULL,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `biodata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NULL,
    `no_telp` VARCHAR(191) NULL,
    `kota` VARCHAR(191) NULL,
    `kode_pos` VARCHAR(191) NULL,
    `photo` VARCHAR(191) NULL,
    `tanggal_lahir` DATETIME(3) NULL,
    `jenis_kelamin` VARCHAR(191) NULL,
    `jabatan` VARCHAR(191) NULL,
    `pangkat` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `id_user` INTEGER NOT NULL,

    UNIQUE INDEX `biodata_id_user_key`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_role` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `permission_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_role` INTEGER NOT NULL,
    `id_permission` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jenis_pengawasan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `createdBy` INTEGER NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kelompok_pengawasan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` INTEGER NULL,
    `id_jenis_pengawasan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_pengawasan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kelompok_pengawasan` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `createdBy` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pkpt` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `area_pengawasan` VARCHAR(191) NOT NULL,
    `tujuan` VARCHAR(191) NOT NULL,
    `tingkat_resiko` VARCHAR(191) NOT NULL DEFAULT 'Rendah',
    `id_jenis_pengawasan` INTEGER NOT NULL,
    `ruang_lingkup` VARCHAR(191) NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jenis_penugasan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pkpt` INTEGER NULL,
    `jenis_penugasan` VARCHAR(191) NOT NULL,
    `non_pkpt` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_status` INTEGER NOT NULL DEFAULT 1,
    `createdBy` INTEGER NOT NULL,
    `updatedBy` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penugasan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dasar_penugasan` VARCHAR(191) NULL,
    `sifat_penugasan` VARCHAR(191) NULL,
    `nama_penugasan` VARCHAR(191) NULL,
    `alamat_penugasan` VARCHAR(191) NULL,
    `catatan` VARCHAR(191) NULL,
    `nomor_kartu` VARCHAR(191) NULL,
    `id_jenis_penugasan` INTEGER NOT NULL,
    `id_status_penugasan` INTEGER NULL,
    `alasan_penolakan` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rute_perencanaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penugasan` INTEGER NOT NULL,
    `uraian_pekerjaan` VARCHAR(191) NOT NULL,
    `nama_penanggung` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(191) NOT NULL,
    `tanggal_paraf` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `km1` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penugasan` INTEGER NOT NULL,
    `rencana_penugasan` VARCHAR(191) NULL,
    `tahun_penugasan_terakhir` INTEGER NULL,
    `alamat` VARCHAR(191) NULL,
    `tingkat_risiko` VARCHAR(191) NULL,
    `tujuan_penugasan` VARCHAR(191) NULL,
    `rencana_mulai` DATETIME(3) NULL,
    `rencana_selesai` DATETIME(3) NULL,
    `anggaran_diajukan` DOUBLE NULL,
    `anggaran_disetujui` DOUBLE NULL,
    `catatan_penting` VARCHAR(191) NULL,
    `ttd_katim` INTEGER NULL,
    `tgl_ttd_katim` DATETIME(3) NULL,
    `ttd_ppj` INTEGER NULL,
    `tgl_ttd_ppj` DATETIME(3) NULL,
    `ttd_pt` INTEGER NULL,
    `tgl_ttd_pt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `susunan_tim` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penugasan` INTEGER NOT NULL,
    `nip` VARCHAR(191) NOT NULL,
    `id_peran` INTEGER NULL,
    `satuan` VARCHAR(191) NULL,
    `honorarium` INTEGER NULL,
    `alokasi_anggaran` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `peran_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `km2` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penugasan` INTEGER NOT NULL,
    `sasaran_penugasan_type` VARCHAR(191) NOT NULL DEFAULT 'lainnya',
    `sasaran_penugasan` VARCHAR(191) NOT NULL,
    `ttd_kasubag_umum` INTEGER NULL,
    `tgl_ttd_kasubag_umum` DATETIME(3) NULL,
    `ttd_ppj` INTEGER NULL,
    `tgl_ttd_ppj` DATETIME(3) NULL,
    `ttd_sekretaris` INTEGER NULL,
    `tgl_ttd_sekretaris` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `km2_rincian_pekerjaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_km2` INTEGER NOT NULL,
    `id_kelompok_pengawasan` INTEGER NOT NULL,
    `id_item_pengawasan` INTEGER NOT NULL,
    `tanggal_awal` DATETIME(3) NULL,
    `tanggal_akhir` DATETIME(3) NULL,
    `anggaran_waktu` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `km2_pelaksana` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_peran` INTEGER NOT NULL,
    `id_km2_rincian_pekerjaan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pelaksana` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `pelaksana_kode_key`(`kode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `km3` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penugasan` INTEGER NOT NULL,
    `ttd_katim` INTEGER NULL,
    `tgl_ttd_katim` DATETIME(3) NULL,
    `ttd_pt` INTEGER NULL,
    `tgl_ttd_pt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `km3_peran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_km3` INTEGER NOT NULL,
    `id_peran` INTEGER NOT NULL,
    `rencana_jam` DOUBLE NULL,
    `realisasi_jam` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `km3_rincian_pekerjaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_km3` INTEGER NOT NULL,
    `id_kelompok_pengawasan` INTEGER NOT NULL,
    `id_item_pengawasan` INTEGER NOT NULL,
    `rencana_jam` DOUBLE NULL,
    `anggaran_jam` DOUBLE NULL,
    `realisasi_biaya` DOUBLE NULL,
    `anggaran_biaya` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `km4` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penugasan` INTEGER NOT NULL,
    `tujuan` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `km4_program_kerja` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prosedur` VARCHAR(191) NOT NULL,
    `anggaran_waktu` INTEGER NOT NULL,
    `realisasi_waktu` INTEGER NOT NULL,
    `no_kka` VARCHAR(191) NULL,
    `id_km4` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `km4_auditors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_km4_program_kerja` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `opd` ADD CONSTRAINT `opd_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `opd` ADD CONSTRAINT `opd_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `biodata` ADD CONSTRAINT `biodata_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_role` ADD CONSTRAINT `user_role_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_role` ADD CONSTRAINT `user_role_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permission` ADD CONSTRAINT `role_permission_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permission` ADD CONSTRAINT `role_permission_id_permission_fkey` FOREIGN KEY (`id_permission`) REFERENCES `permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jenis_pengawasan` ADD CONSTRAINT `jenis_pengawasan_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jenis_pengawasan` ADD CONSTRAINT `jenis_pengawasan_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kelompok_pengawasan` ADD CONSTRAINT `kelompok_pengawasan_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kelompok_pengawasan` ADD CONSTRAINT `kelompok_pengawasan_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kelompok_pengawasan` ADD CONSTRAINT `kelompok_pengawasan_id_jenis_pengawasan_fkey` FOREIGN KEY (`id_jenis_pengawasan`) REFERENCES `jenis_pengawasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_pengawasan` ADD CONSTRAINT `item_pengawasan_id_kelompok_pengawasan_fkey` FOREIGN KEY (`id_kelompok_pengawasan`) REFERENCES `kelompok_pengawasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_pengawasan` ADD CONSTRAINT `item_pengawasan_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_pengawasan` ADD CONSTRAINT `item_pengawasan_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pkpt` ADD CONSTRAINT `pkpt_id_jenis_pengawasan_fkey` FOREIGN KEY (`id_jenis_pengawasan`) REFERENCES `jenis_pengawasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pkpt` ADD CONSTRAINT `pkpt_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pkpt` ADD CONSTRAINT `pkpt_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jenis_penugasan` ADD CONSTRAINT `jenis_penugasan_id_pkpt_fkey` FOREIGN KEY (`id_pkpt`) REFERENCES `pkpt`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jenis_penugasan` ADD CONSTRAINT `jenis_penugasan_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jenis_penugasan` ADD CONSTRAINT `jenis_penugasan_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jenis_penugasan` ADD CONSTRAINT `jenis_penugasan_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penugasan` ADD CONSTRAINT `penugasan_id_jenis_penugasan_fkey` FOREIGN KEY (`id_jenis_penugasan`) REFERENCES `jenis_penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penugasan` ADD CONSTRAINT `penugasan_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penugasan` ADD CONSTRAINT `penugasan_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penugasan` ADD CONSTRAINT `penugasan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rute_perencanaan` ADD CONSTRAINT `rute_perencanaan_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km1` ADD CONSTRAINT `km1_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km1` ADD CONSTRAINT `km1_ttd_katim_fkey` FOREIGN KEY (`ttd_katim`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km1` ADD CONSTRAINT `km1_ttd_ppj_fkey` FOREIGN KEY (`ttd_ppj`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km1` ADD CONSTRAINT `km1_ttd_pt_fkey` FOREIGN KEY (`ttd_pt`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `susunan_tim` ADD CONSTRAINT `susunan_tim_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `susunan_tim` ADD CONSTRAINT `susunan_tim_nip_fkey` FOREIGN KEY (`nip`) REFERENCES `user`(`nip`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `susunan_tim` ADD CONSTRAINT `susunan_tim_id_peran_fkey` FOREIGN KEY (`id_peran`) REFERENCES `peran`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km2` ADD CONSTRAINT `km2_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km2` ADD CONSTRAINT `km2_ttd_kasubag_umum_fkey` FOREIGN KEY (`ttd_kasubag_umum`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km2` ADD CONSTRAINT `km2_ttd_ppj_fkey` FOREIGN KEY (`ttd_ppj`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km2` ADD CONSTRAINT `km2_ttd_sekretaris_fkey` FOREIGN KEY (`ttd_sekretaris`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km2_rincian_pekerjaan` ADD CONSTRAINT `km2_rincian_pekerjaan_id_km2_fkey` FOREIGN KEY (`id_km2`) REFERENCES `km2`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km2_rincian_pekerjaan` ADD CONSTRAINT `km2_rincian_pekerjaan_id_kelompok_pengawasan_fkey` FOREIGN KEY (`id_kelompok_pengawasan`) REFERENCES `kelompok_pengawasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km2_rincian_pekerjaan` ADD CONSTRAINT `km2_rincian_pekerjaan_id_item_pengawasan_fkey` FOREIGN KEY (`id_item_pengawasan`) REFERENCES `item_pengawasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km2_pelaksana` ADD CONSTRAINT `km2_pelaksana_id_peran_fkey` FOREIGN KEY (`id_peran`) REFERENCES `peran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km2_pelaksana` ADD CONSTRAINT `km2_pelaksana_id_km2_rincian_pekerjaan_fkey` FOREIGN KEY (`id_km2_rincian_pekerjaan`) REFERENCES `km2_rincian_pekerjaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km3` ADD CONSTRAINT `km3_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km3` ADD CONSTRAINT `km3_ttd_katim_fkey` FOREIGN KEY (`ttd_katim`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km3` ADD CONSTRAINT `km3_ttd_pt_fkey` FOREIGN KEY (`ttd_pt`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km3_peran` ADD CONSTRAINT `km3_peran_id_km3_fkey` FOREIGN KEY (`id_km3`) REFERENCES `km3`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km3_peran` ADD CONSTRAINT `km3_peran_id_peran_fkey` FOREIGN KEY (`id_peran`) REFERENCES `peran`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km3_rincian_pekerjaan` ADD CONSTRAINT `km3_rincian_pekerjaan_id_km3_fkey` FOREIGN KEY (`id_km3`) REFERENCES `km3`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km3_rincian_pekerjaan` ADD CONSTRAINT `km3_rincian_pekerjaan_id_kelompok_pengawasan_fkey` FOREIGN KEY (`id_kelompok_pengawasan`) REFERENCES `kelompok_pengawasan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km3_rincian_pekerjaan` ADD CONSTRAINT `km3_rincian_pekerjaan_id_item_pengawasan_fkey` FOREIGN KEY (`id_item_pengawasan`) REFERENCES `item_pengawasan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km4` ADD CONSTRAINT `km4_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km4_program_kerja` ADD CONSTRAINT `km4_program_kerja_id_km4_fkey` FOREIGN KEY (`id_km4`) REFERENCES `km4`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km4_auditors` ADD CONSTRAINT `km4_auditors_id_km4_program_kerja_fkey` FOREIGN KEY (`id_km4_program_kerja`) REFERENCES `km4_program_kerja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
