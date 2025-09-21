// create-km4-program-kerja.dto.ts
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateKM4AuditorsDto } from './create-km4-auditors.dto';

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

  @IsOptional()
  @IsString()
  no_kka?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateKM4AuditorsDto)
  auditors?: CreateKM4AuditorsDto[];
}
