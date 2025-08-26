import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsArray,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

// ---------------- DTO Utama ----------------
export class CreatePenugasanDto {
  @IsOptional() @IsString() dasar_penugasan?: string;
  @IsOptional() @IsString() sifat_penugasan?: string;
  @IsOptional() @IsString() nama_penugasan?: string;
  @IsOptional() @IsString() alamat_penugasan?: string;
  @IsOptional() @IsString() nomor_kartu?: string;
  @IsOptional() @IsString() penanggung_jawab?: string;
  @IsOptional() @IsString() pembantu_penanggung_jawab?: string;
  @IsOptional() @IsString() pengendali_teknis?: string;
  @IsOptional() @IsString() ketua_tim?: string;
  @IsOptional() @IsString() catatan?: string;

  @IsNotEmpty() @IsString() createdBy: string;
  @IsOptional() @IsString() updatedBy?: string;

  // ---------------- Rute Perencanaan ----------------
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RutePerencanaanDto)
  rute_perencanaan?: RutePerencanaanDto[];

  // ---------------- KM1 ----------------
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KM1Dto)
  km1?: KM1Dto[];

  // ---------------- KM2 ----------------
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KM2Dto)
  km2?: KM2Dto[];

  // ---------------- Penugasan KM2 ----------------
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PenugasanKM2Dto)
  penugasan_km2?: PenugasanKM2Dto[];

  // ---------------- KM3 ----------------
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KM3Dto)
  KM3?: KM3Dto[];

  // ---------------- KM4 ----------------
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KM4Dto)
  km4?: KM4Dto[];
}

// ---------------- Rute Perencanaan DTO ----------------
export class RutePerencanaanDto {
  @IsNotEmpty() @IsNumber() no_urutan: number;
  @IsNotEmpty() @IsString() uraian_pekerjaan: string;
  @IsNotEmpty() @IsString() nama_penangggung: string;
  @IsNotEmpty() @IsString() nip: string;
  @IsNotEmpty() @IsDate() @Type(() => Date) tanggal_paraf: Date;
}

// ---------------- KM1 DTO ----------------
export class KM1Dto {
  @IsNotEmpty() @IsString() rencana_penugasan: string;
  @IsNotEmpty() @IsNumber() tahun_penugasan_terakhir: number;
  @IsNotEmpty() @IsString() alamat: string;
  @IsNotEmpty() @IsString() tingkat_risiko: string;
  @IsNotEmpty() @IsString() tujuan_penugasan: string;
  @IsOptional() @IsString() surat_tugas_nomor?: string;
  @IsNotEmpty() @IsDate() @Type(() => Date) rencana_mulai: Date;
  @IsNotEmpty() @IsDate() @Type(() => Date) rencana_selesai: Date;
  @IsOptional() @IsNumber() anggaran_diajukan?: number;
  @IsOptional() @IsNumber() anggaran_disetujui?: number;
  @IsOptional() @IsString() catatan_penting?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KM1SusunanTimDto)
  KM1SusunanTim?: KM1SusunanTimDto[];
}

// ---------------- KM1 Susunan Tim DTO ----------------
export class KM1SusunanTimDto {
  @IsNotEmpty() @IsString() nip: string;
  @IsOptional() @IsNumber() id_peran?: number;
  @IsOptional() @IsString() satuan?: string;
  @IsOptional() @IsNumber() honorarium?: number;
  @IsOptional() @IsNumber() alokasi_anggaran?: number;
}

// ---------------- KM2 DTO ----------------
export class KM2Dto {
  @IsNotEmpty() @IsString() sasaran_penugasan: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KM2RincianPekerjaanDto)
  km2_rincian_pekerjaan?: KM2RincianPekerjaanDto[];
}

export class KM2RincianPekerjaanDto {
  @IsNotEmpty() @IsNumber() id_jenis_pekerjaan: number;
  @IsNotEmpty() @IsNumber() id_penugasan_km2: number;
}

// ---------------- Penugasan KM2 DTO ----------------
export class PenugasanKM2Dto {
  @IsNotEmpty() @IsNumber() id_jenis_pekerjaan: number;
  @IsNotEmpty() @IsNumber() id_item_jenis_pekerjaan: number;
  @IsNotEmpty() @IsDate() @Type(() => Date) tanggal: Date;
  @IsNotEmpty() @IsNumber() anggaran_waktu: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PenugasanKM2ItemDto)
  penugasaan_km2_item_jenis_pekerjaan?: PenugasanKM2ItemDto[];
}

export class PenugasanKM2ItemDto {
  @IsNotEmpty() @IsNumber() id_item_jenis_pekerjaan: number;
}

// ---------------- KM3 DTO ----------------
export class KM3Dto {
  @IsNotEmpty() @IsNumber() id_jenis_pekerjaan: number;
  @IsNotEmpty() @IsNumber() id_item_jenis_pekerjaan: number;
  @IsOptional() @IsNumber() rencana_jam?: number;
  @IsOptional() @IsNumber() anggaran_jam?: number;
  @IsOptional() @IsNumber() realisasi_biaya?: number;
  @IsOptional() @IsNumber() anggaran_biaya?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KM3RencanaRealisasiWaktuDto)
  km3_rencana_realisasi_waktu?: KM3RencanaRealisasiWaktuDto[];
}

export class KM3RencanaRealisasiWaktuDto {
  @IsNotEmpty() @IsNumber() id_peran: number;
  @IsOptional() @IsNumber() rencana_jam?: number;
  @IsOptional() @IsNumber() realisasi_jam?: number;
}

// ---------------- KM4 DTO ----------------
export class KM4Dto {
  @IsOptional() @IsString() tujuan?: string;
  @IsOptional() @IsString() prosedur?: string;
  @IsOptional() @IsNumber() anggaran_waktu?: number;
  @IsOptional() @IsNumber() realisasi_waktu?: number;
  @IsOptional() @IsString() no_kka?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KM4AuditorDto)
  km4_auditor?: KM4AuditorDto[];
}

export class KM4AuditorDto {
  @IsOptional() @IsString() nip?: string;
  @IsOptional() @IsNumber() id_pegawai?: number;
}
