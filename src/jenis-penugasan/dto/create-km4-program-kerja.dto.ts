import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { CreateKM4AuditorsDto } from './create-km4-auditors.dto';

export class CreateKM4ProgramKerjaDto {
  id: number;
  prosedur: string;

  anggaran_waktu: number;
  realisasi_waktu: number;
  no_kka: string;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateKM4AuditorsDto)
  auditors?: CreateKM4AuditorsDto[];
}
