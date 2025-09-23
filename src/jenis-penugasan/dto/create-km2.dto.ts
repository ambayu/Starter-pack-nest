import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { CreateKM2RincianPekerjaanDto } from './create-km2-rincian-pekerjaan.dto';

export class CreateKM2Dto {
  id: number;
  sasaran_penugasan: string;
  sasaran_penugasan_type: string;

  @IsOptional()
  ttd_kasubag_umum: string;

  @IsOptional()
  tgl_ttd_kasubag_umum: string;

  @IsOptional()
  ttd_ppj: string;

  @IsOptional()
  tgl_ttd_ppj: string;

  @IsOptional()
  ttd_sekretaris: string;

  @IsOptional()
  tgl_ttd_sekretaris: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateKM2RincianPekerjaanDto)
  km2_rincian_pekerjaan?: CreateKM2RincianPekerjaanDto[];
}
