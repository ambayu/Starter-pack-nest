import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { CreateKM3RincianPekerjaanDto } from './create-km3-rincian-pekerjaan.dto';
import { CreateKM3PeranDto } from './create-km3-peran.dto';

export class CreateKM3Dto {
  id: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateKM3RincianPekerjaanDto)
  km3_rincian_pekerjaan?: CreateKM3RincianPekerjaanDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateKM3PeranDto)
  km3_peran?: CreateKM3PeranDto[];
}
