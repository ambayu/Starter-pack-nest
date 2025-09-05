import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { CreateKM2PelaksanaanDto } from './create-km2-pelaksanaan.dto';
export class CreateKM2RincianPekerjaanDto {
  id: number;
  @IsNotEmpty({ message: 'uraian pekerjaan tidak boleh kosong' })
  tanggal: Date;
  @IsNotEmpty({ message: 'anggaran waktu tidak boleh kosong' })
  anggaran_waktu: number;
  @IsNotEmpty({ message: 'rincian pekerjaan tidak boleh kosong' })
  id_rincian_pekerjaan: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateKM2PelaksanaanDto)
  km2Pelaksanaan?: CreateKM2PelaksanaanDto[];
}
