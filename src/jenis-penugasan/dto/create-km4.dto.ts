import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateKM4AuditorDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsNotEmpty()
  @IsString()
  nama: string;

  @IsOptional()
  @IsString()
  nip?: string;
}

export class CreateKM4ProgramKerjaDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsNotEmpty()
  @IsString()
  prosedur: string;

  @IsNotEmpty()
  @IsInt()
  anggaran_waktu: number;

  @IsNotEmpty()
  @IsInt()
  realisasi_waktu: number;

  @IsNotEmpty()
  @IsString()
  no_kka: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateKM4AuditorDto)
  auditors: CreateKM4AuditorDto[];
}

export class CreateKM4TujuanDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsNotEmpty()
  @IsString()
  deskripsi: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateKM4ProgramKerjaDto)
  program_kerja: CreateKM4ProgramKerjaDto[];
}

export class CreateKM4Dto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsNotEmpty()
  @IsInt()
  id_penugasan: number; // relasi ke penugasan

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateKM4TujuanDto)
  tujuan: CreateKM4TujuanDto[];
}
