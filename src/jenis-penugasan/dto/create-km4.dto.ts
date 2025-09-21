// create-km4.dto.ts
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateKM4ProgramKerjaDto } from './create-km4-program-kerja.dto';

export class CreateKM4Dto {
  @IsOptional()
  @IsInt()
  id?: number;


  @IsOptional()
  @IsInt()
  id_penugasa?: number; // relasi ke penugasan

  @IsOptional()

  tujuan?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateKM4ProgramKerjaDto)
  program_kerja: CreateKM4ProgramKerjaDto[];
}
