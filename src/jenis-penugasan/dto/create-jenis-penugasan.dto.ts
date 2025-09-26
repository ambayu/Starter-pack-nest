import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePenugasanDto } from './create-penugasan.dto';
import { CreateSusunanTimDto } from './create-susunan-tim.dto';
import { CreatePelaporanDto } from 'src/pelaporan/dto/create-pelaporan.dto';

export class CreateJenisPenugasanDto {
  id?: number;

  @IsNotEmpty({ message: 'jenis penugasan tidak boleh kosong' })
  jenis_penugasan: string;

  id_pkpt?: number;

  non_pkpt?: string;

  createdBy?: number;

  updatedBy?: number;


  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePenugasanDto)
  Penugasan?: CreatePenugasanDto;

  @IsOptional()
  Pelaporan?: CreatePelaporanDto;

}
