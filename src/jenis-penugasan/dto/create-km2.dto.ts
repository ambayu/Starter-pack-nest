import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { CreateKM2RincianPekerjaanDto } from './create-km2-rincian-pekerjaan.dto';

export class CreateKM2Dto {
  id: number;
  sasaran_penugasan: string;
  sasaran_penugasan_type: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateKM2RincianPekerjaanDto)
  km2_rincian_pekerjaan?: CreateKM2RincianPekerjaanDto[];
}
