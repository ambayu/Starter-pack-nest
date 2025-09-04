import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePenugasanDto } from './create-penugasan.dto';
import { CreateSusunanTimDto } from './create-susunan-tim.dto';

export class CreateJenisPenugasanDto {
  id?: number;

  @IsNotEmpty({ message: 'jenis penugasan tidak boleh kosong' })
  jenis_penugasan: string;

  @IsNotEmpty({ message: 'createdBy tidak boleh kosong' })
  createdBy: string;

  @IsOptional()
  area_penugasan?: string;

  @IsOptional()
  sifat_penugasan?: string;

  @IsOptional()
  jenis_pengawasan?: string;

  @IsOptional()
  alamat?: string;

  @IsOptional()
  nomor_telp?: string;

  @IsOptional()
  tujuan_penugasan?: string;

  @IsOptional()
  ruang_lingkup?: string;

  @IsOptional()
  tahun_penugasan?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePenugasanDto)
  Penugasan?: CreatePenugasanDto;


}
