-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Biodata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NULL,
    `no_telp` VARCHAR(191) NULL,
    `kota` VARCHAR(191) NULL,
    `kode_pos` VARCHAR(191) NULL,
    `photo` VARCHAR(191) NULL,
    `tanggal_lahir` DATETIME(3) NULL,
    `jenis_kelamin` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `id_user` INTEGER NOT NULL,

    UNIQUE INDEX `Biodata_id_user_key`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_role` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Permission_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolePermission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_role` INTEGER NOT NULL,
    `id_permission` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JenisPenugasan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jenis_penugasan` VARCHAR(191) NOT NULL,
    `area_penugasan` VARCHAR(191) NULL,
    `sifat_penugasan` VARCHAR(191) NULL,
    `jenis_pengawasan` VARCHAR(191) NULL,
    `alamat` VARCHAR(191) NULL,
    `nomor_telp` VARCHAR(191) NULL,
    `tujuan_penugasan` VARCHAR(191) NULL,
    `ruang_lingkup` VARCHAR(191) NULL,
    `tahun_penugasan` INTEGER NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Penugasan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dasar_penugasan` VARCHAR(191) NULL,
    `sifat_penugasan` VARCHAR(191) NULL,
    `nama_penugasan` VARCHAR(191) NULL,
    `alamat_penugasan` VARCHAR(191) NULL,
    `nomor_kartu` VARCHAR(191) NULL,
    `penanggung_jawab` VARCHAR(191) NULL,
    `pembantu_penanggung_jawab` VARCHAR(191) NULL,
    `pengendali_teknis` VARCHAR(191) NULL,
    `ketua_tim` VARCHAR(191) NULL,
    `catatan` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_jenis_penugasan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RutePerencanaan` (
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
CREATE TABLE `KM1` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penugasan` INTEGER NOT NULL,
    `rencana_penugasan` VARCHAR(191) NOT NULL,
    `tahun_penugasan_terakhir` INTEGER NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `tingkat_risiko` VARCHAR(191) NOT NULL,
    `tujuan_penugasan` VARCHAR(191) NOT NULL,
    `surat_tugas_nomor` VARCHAR(191) NULL,
    `rencana_mulai` DATETIME(3) NOT NULL,
    `rencana_selesai` DATETIME(3) NOT NULL,
    `anggaran_diajukan` DOUBLE NULL,
    `anggaran_disetujui` DOUBLE NULL,
    `catatan_penting` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SusunanTim` (
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
CREATE TABLE `Peran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Peran_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KM2` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penugasan` INTEGER NOT NULL,
    `sasaran_penugasan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KM2RincianPekerjaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_km2` INTEGER NOT NULL,
    `id_rincian_pekerjaan` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `anggaran_waktu` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KM2Pelaksana` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pelaksana` INTEGER NOT NULL,
    `id_km2_rincian_pekerjaan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pelaksana` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `Pelaksana_kode_key`(`kode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RincianPekerjaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kelompok_rincian_pekerjaan` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KelompokRincianPekerjaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KM3` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penugasan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KM3Peran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_km3` INTEGER NOT NULL,
    `id_peran` INTEGER NOT NULL,
    `rencana_jam` DOUBLE NULL,
    `realisasi_jam` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KM3RincianPekerjaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_km3` INTEGER NOT NULL,
    `id_rincian_pekerjaan` INTEGER NOT NULL,
    `rencana_jam` DOUBLE NULL,
    `anggaran_jam` DOUBLE NULL,
    `realisasi_biaya` DOUBLE NULL,
    `anggaran_biaya` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KM4` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penugasan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KM4ProgramKerja` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prosedur` VARCHAR(191) NOT NULL,
    `anggaran_waktu` INTEGER NOT NULL,
    `realisasi_waktu` INTEGER NOT NULL,
    `no_kka` VARCHAR(191) NOT NULL,
    `id_km4` INTEGER NULL,
    `kM4Id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `km4Auditors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_km4_program_kerja` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pegawai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `pegawai_nip_key`(`nip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rute_Pelaporan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KM5` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `permasalahan` VARCHAR(191) NOT NULL,
    `index_kka` VARCHAR(191) NOT NULL,
    `penyelesaian` VARCHAR(191) NOT NULL,
    `persetujuan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Biodata` ADD CONSTRAINT `Biodata_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_id_permission_fkey` FOREIGN KEY (`id_permission`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penugasan` ADD CONSTRAINT `Penugasan_id_jenis_penugasan_fkey` FOREIGN KEY (`id_jenis_penugasan`) REFERENCES `JenisPenugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RutePerencanaan` ADD CONSTRAINT `RutePerencanaan_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `Penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM1` ADD CONSTRAINT `KM1_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `Penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SusunanTim` ADD CONSTRAINT `SusunanTim_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `Penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SusunanTim` ADD CONSTRAINT `SusunanTim_id_peran_fkey` FOREIGN KEY (`id_peran`) REFERENCES `Peran`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM2` ADD CONSTRAINT `KM2_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `Penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM2RincianPekerjaan` ADD CONSTRAINT `KM2RincianPekerjaan_id_km2_fkey` FOREIGN KEY (`id_km2`) REFERENCES `KM2`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM2RincianPekerjaan` ADD CONSTRAINT `KM2RincianPekerjaan_id_rincian_pekerjaan_fkey` FOREIGN KEY (`id_rincian_pekerjaan`) REFERENCES `RincianPekerjaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM2Pelaksana` ADD CONSTRAINT `KM2Pelaksana_id_km2_rincian_pekerjaan_fkey` FOREIGN KEY (`id_km2_rincian_pekerjaan`) REFERENCES `KM2RincianPekerjaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM2Pelaksana` ADD CONSTRAINT `KM2Pelaksana_id_pelaksana_fkey` FOREIGN KEY (`id_pelaksana`) REFERENCES `Pelaksana`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RincianPekerjaan` ADD CONSTRAINT `RincianPekerjaan_id_kelompok_rincian_pekerjaan_fkey` FOREIGN KEY (`id_kelompok_rincian_pekerjaan`) REFERENCES `KelompokRincianPekerjaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM3` ADD CONSTRAINT `KM3_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `Penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM3Peran` ADD CONSTRAINT `KM3Peran_id_km3_fkey` FOREIGN KEY (`id_km3`) REFERENCES `KM3`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM3Peran` ADD CONSTRAINT `KM3Peran_id_peran_fkey` FOREIGN KEY (`id_peran`) REFERENCES `Peran`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM3RincianPekerjaan` ADD CONSTRAINT `KM3RincianPekerjaan_id_km3_fkey` FOREIGN KEY (`id_km3`) REFERENCES `KM3`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM3RincianPekerjaan` ADD CONSTRAINT `KM3RincianPekerjaan_id_rincian_pekerjaan_fkey` FOREIGN KEY (`id_rincian_pekerjaan`) REFERENCES `RincianPekerjaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM4` ADD CONSTRAINT `KM4_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `Penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM4ProgramKerja` ADD CONSTRAINT `KM4ProgramKerja_kM4Id_fkey` FOREIGN KEY (`kM4Id`) REFERENCES `KM4`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km4Auditors` ADD CONSTRAINT `km4Auditors_id_km4_program_kerja_fkey` FOREIGN KEY (`id_km4_program_kerja`) REFERENCES `KM4ProgramKerja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
