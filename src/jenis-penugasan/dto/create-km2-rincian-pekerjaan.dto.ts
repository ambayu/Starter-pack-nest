import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { CreateKM2PelaksanaanDto } from './create-km2-pelaksanaan.dto';
export class CreateKM2RincianPekerjaanDto {
  id: number;

  @IsOptional()

  tanggal_awal?: Date;
  @IsOptional()

  tanggal_akhir?: Date;
  anggaran_waktu: number;

  id_kelompok_pengawasan: number;
  id_item_pengawasan: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateKM2PelaksanaanDto)
  km2Pelaksanaan?: CreateKM2PelaksanaanDto[];
}
