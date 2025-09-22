import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { CreateRutePerencanaanDto } from './create-rute-perencanaan.dto';
import { CreateKM1Dto } from './create-km1.dto';
import { CreateKM2Dto } from './create-km2.dto';
import { CreateKM3Dto } from './create-km3.dto';
import { CreateKM4Dto } from './create-km4.dto';
import { CreateSusunanTimDto } from './create-susunan-tim.dto';

export class CreatePenugasanDto {
  id?: number;

  @IsOptional()
  id_status?: number;
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
  
  createdBy: number;

  @IsOptional()
  catatan?: string;

  @IsOptional()
  updatedBy?: number;

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

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateKM2Dto)
  km2?: CreateKM2Dto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateKM3Dto)
  km3?: CreateKM3Dto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateKM4Dto)
  km4?: CreateKM4Dto;
}
