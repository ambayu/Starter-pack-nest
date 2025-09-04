import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { CreateRutePerencanaanDto } from './create-rute-perencanaan.dto';
import { CreateKM1Dto } from './create-km1.dto';
import { CreateSusunanTimDto } from './create-susunan-tim.dto';

export class CreatePenugasanDto {
  id?: number;

  @IsOptional()
  dasar_penugasan?: string;

  @IsOptional()
  sifat_penugasan?: string;

  @IsOptional()
  nama_penugasan?: string;

  @IsOptional()
  alamat_penugasan?: string;

  @IsOptional()
  nomor_kartu?: string;

  @IsOptional()
  penanggung_jawab?: string;

  @IsOptional()
  pembantu_penanggung_jawab?: string;

  @IsOptional()
  pengendali_teknis?: string;

  @IsOptional()
  ketua_tim?: string;

  @IsOptional()
  catatan?: string;

  @IsOptional()
  updatedBy?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateRutePerencanaanDto)
  rute_perencanaan?: CreateRutePerencanaanDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSusunanTimDto)
  susunan_tim?: CreateSusunanTimDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateKM1Dto)
  km1?: CreateKM1Dto;
}
