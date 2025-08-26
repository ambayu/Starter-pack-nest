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
CREATE TABLE `Penugasan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dasar_penugasan` VARCHAR(191) NOT NULL,
    `sifat_penugasan` VARCHAR(191) NOT NULL,
    `nama_penugasan` VARCHAR(191) NOT NULL,
    `alamat_penugasan` VARCHAR(191) NOT NULL,
    `nomor_kartu` VARCHAR(191) NOT NULL,
    `penanggung_jawab` VARCHAR(191) NOT NULL,
    `pembantu_penanggung_jawab` VARCHAR(191) NOT NULL,
    `pengendali_teknis` VARCHAR(191) NOT NULL,
    `ketua_tim` VARCHAR(191) NOT NULL,
    `catatan` VARCHAR(191) NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `updatedBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RutePerencanaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penugasan` INTEGER NOT NULL,
    `no_urutan` INTEGER NOT NULL,
    `uraian_pekerjaan` VARCHAR(191) NOT NULL,
    `nama_penangggung` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(191) NOT NULL,
    `tanggal_paraf` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `RutePerencanaan_no_urutan_key`(`no_urutan`),
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
CREATE TABLE `KM1SusunanTim` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_km1` INTEGER NOT NULL,
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
    `id_jenis_pekerjaan` INTEGER NOT NULL,
    `id_penugasan_km2` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jenisPekerjaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `jenisPekerjaan_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemJenisPekerjaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ItemJenisPekerjaan_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PenugasanKM2` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_jenis_pekerjaan` INTEGER NOT NULL,
    `id_item_jenis_pekerjaan` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `anggaran_waktu` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PenugasanKM2ItemJenisPekerjaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penugasan_km2` INTEGER NOT NULL,
    `id_item_jenis_pekerjaan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KM3` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penugasan` INTEGER NOT NULL,
    `id_jenis_pekerjaan` INTEGER NOT NULL,
    `id_item_jenis_pekerjaan` INTEGER NOT NULL,
    `rencana_jam` DOUBLE NULL,
    `anggaran_jam` DOUBLE NULL,
    `realisasi_biaya` DOUBLE NULL,
    `anggaran_biaya` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KM3RencanaRealisasiWaktu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_km3` INTEGER NOT NULL,
    `id_peran` INTEGER NOT NULL,
    `rencana_jam` DOUBLE NULL,
    `realisasi_jam` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `km4` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penugasan` INTEGER NOT NULL,
    `tujuan` VARCHAR(191) NULL,
    `prosedur` VARCHAR(191) NULL,
    `anggaran_waktu` INTEGER NULL,
    `realisasi_waktu` INTEGER NULL,
    `no_kka` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `km4Auditor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_km4` INTEGER NOT NULL,
    `nip` VARCHAR(191) NULL,
    `id_pegawai` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

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
ALTER TABLE `RutePerencanaan` ADD CONSTRAINT `RutePerencanaan_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `Penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM1` ADD CONSTRAINT `KM1_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `Penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM1SusunanTim` ADD CONSTRAINT `KM1SusunanTim_id_km1_fkey` FOREIGN KEY (`id_km1`) REFERENCES `KM1`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM1SusunanTim` ADD CONSTRAINT `KM1SusunanTim_id_peran_fkey` FOREIGN KEY (`id_peran`) REFERENCES `Peran`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM2` ADD CONSTRAINT `KM2_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `Penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM2RincianPekerjaan` ADD CONSTRAINT `KM2RincianPekerjaan_id_km2_fkey` FOREIGN KEY (`id_km2`) REFERENCES `KM2`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM2RincianPekerjaan` ADD CONSTRAINT `KM2RincianPekerjaan_id_penugasan_km2_fkey` FOREIGN KEY (`id_penugasan_km2`) REFERENCES `PenugasanKM2`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PenugasanKM2` ADD CONSTRAINT `PenugasanKM2_id_jenis_pekerjaan_fkey` FOREIGN KEY (`id_jenis_pekerjaan`) REFERENCES `jenisPekerjaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PenugasanKM2` ADD CONSTRAINT `PenugasanKM2_id_item_jenis_pekerjaan_fkey` FOREIGN KEY (`id_item_jenis_pekerjaan`) REFERENCES `ItemJenisPekerjaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PenugasanKM2ItemJenisPekerjaan` ADD CONSTRAINT `PenugasanKM2ItemJenisPekerjaan_id_penugasan_km2_fkey` FOREIGN KEY (`id_penugasan_km2`) REFERENCES `PenugasanKM2`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PenugasanKM2ItemJenisPekerjaan` ADD CONSTRAINT `PenugasanKM2ItemJenisPekerjaan_id_item_jenis_pekerjaan_fkey` FOREIGN KEY (`id_item_jenis_pekerjaan`) REFERENCES `ItemJenisPekerjaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM3` ADD CONSTRAINT `KM3_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `Penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM3` ADD CONSTRAINT `KM3_id_jenis_pekerjaan_fkey` FOREIGN KEY (`id_jenis_pekerjaan`) REFERENCES `jenisPekerjaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM3` ADD CONSTRAINT `KM3_id_item_jenis_pekerjaan_fkey` FOREIGN KEY (`id_item_jenis_pekerjaan`) REFERENCES `ItemJenisPekerjaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM3RencanaRealisasiWaktu` ADD CONSTRAINT `KM3RencanaRealisasiWaktu_id_km3_fkey` FOREIGN KEY (`id_km3`) REFERENCES `KM3`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KM3RencanaRealisasiWaktu` ADD CONSTRAINT `KM3RencanaRealisasiWaktu_id_peran_fkey` FOREIGN KEY (`id_peran`) REFERENCES `Peran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km4` ADD CONSTRAINT `km4_id_penugasan_fkey` FOREIGN KEY (`id_penugasan`) REFERENCES `Penugasan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km4Auditor` ADD CONSTRAINT `km4Auditor_id_km4_fkey` FOREIGN KEY (`id_km4`) REFERENCES `km4`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `km4Auditor` ADD CONSTRAINT `km4Auditor_id_pegawai_fkey` FOREIGN KEY (`id_pegawai`) REFERENCES `pegawai`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
