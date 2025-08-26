import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsNumber,
    ValidateNested,
    IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePenugasanDto {
    // --- Field utama Penugasan ---
    @IsNotEmpty({ message: 'Nama penugasan tidak boleh kosong' })
    @IsString({ message: 'Nama penugasan harus berupa teks' })
    nama_penugasan: string;

    @IsOptional()
    @IsString({ message: 'Deskripsi harus berupa teks' })
    deskripsi?: string;

    @IsNotEmpty({ message: 'Tanggal mulai tidak boleh kosong' })
    @IsString({ message: 'Tanggal mulai harus berupa string tanggal' })
    tanggal_mulai: string;

    @IsOptional()
    @IsString({ message: 'Tanggal selesai harus berupa string tanggal' })
    tanggal_selesai?: string;

    // --- Relasi RutePerencanaan ---
    @IsArray({ message: 'Rute perencanaan harus berupa array' })
    @ValidateNested({ each: true })
    @Type(() => RutePerencanaanInlineDto)
    rute_perencanaan: RutePerencanaanInlineDto[];

    // --- Relasi KM1 ---
    @IsOptional()
    @ValidateNested()
    @Type(() => KM1InlineDto)
    km1?: KM1InlineDto;

    // --- Relasi KM2 ---
    @IsOptional()
    @ValidateNested()
    @Type(() => KM2InlineDto)
    km2?: KM2InlineDto;
}

// ---------------- Inline DTO di dalam CreatePenugasanDto ----------------

// Rute Perencanaan
export class RutePerencanaanInlineDto {
    @IsNotEmpty({ message: 'Lokasi tidak boleh kosong' })
    @IsString({ message: 'Lokasi harus berupa teks' })
    lokasi: string;

    @IsNotEmpty({ message: 'Urutan harus diisi' })
    @IsNumber({}, { message: 'Urutan harus berupa angka' })
    urutan: number;
}

// KM1
export class KM1InlineDto {
    @IsOptional()
    @IsString({ message: 'Nomor dokumen harus berupa teks' })
    nomor_dokumen?: string;

    @IsArray({ message: 'Susunan tim harus berupa array' })
    @ValidateNested({ each: true })
    @Type(() => KM1SusunanTimInlineDto)
    KM1SusunanTim: KM1SusunanTimInlineDto[];
}

// KM1 Susunan Tim
export class KM1SusunanTimInlineDto {
    @IsNotEmpty({ message: 'Nama anggota tim tidak boleh kosong' })
    @IsString({ message: 'Nama anggota tim harus berupa teks' })
    nama: string;

    @IsNotEmpty({ message: 'Peran tidak boleh kosong' })
    @IsString({ message: 'Peran harus berupa teks' })
    peran: string;
}

// KM2
export class KM2InlineDto {
    @IsOptional()
    @IsString({ message: 'Catatan KM2 harus berupa teks' })
    catatan?: string;

    @IsArray({ message: 'Rincian pekerjaan harus berupa array' })
    @ValidateNested({ each: true })
    @Type(() => KM2RincianPekerjaanInlineDto)
    km2_rincian_pekerjaan: KM2RincianPekerjaanInlineDto[];
}

// KM2 Rincian Pekerjaan
export class KM2RincianPekerjaanInlineDto {
    @IsNotEmpty({ message: 'Uraian pekerjaan tidak boleh kosong' })
    @IsString({ message: 'Uraian pekerjaan harus berupa teks' })
    uraian: string;

    @IsNotEmpty({ message: 'Durasi harus diisi' })
    @IsNumber({}, { message: 'Durasi harus berupa angka' })
    durasi: number;
}
