import { IsNotEmpty } from 'class-validator';

export class CreateRutePerencanaanDto {
  id: number;

  id_penugasan: number;

  @IsNotEmpty({ message: 'uraian pekerjaan tidak boleh kosong' })
  uraian_pekerjaan: string;
  @IsNotEmpty({ message: 'nama penanggung jawab tidak boleh kosong' })
  nama_penanggung: string;
  @IsNotEmpty({ message: 'nip tidak boleh kosong' })
  nip: string;
  tanggal_paraf: string;
}
