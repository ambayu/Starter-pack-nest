import { IsNotEmpty } from 'class-validator';

export class CreateKM3RincianPekerjaanDto {
  id: number;
  @IsNotEmpty({ message: 'uraian pekerjaan tidak boleh kosong' })

  id_item_pengawasan: number;
  id_kelompok_pengawasan: number;
  rencana_jam: number;
  anggaran_jam: number;
  realisasi_biaya: number;
  anggaran_biaya: number;
}
