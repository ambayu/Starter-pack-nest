import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateKM1Dto {
    id: number;
  @IsNotEmpty({ message: 'rencana_penugasan tidak boleh kosong' })
  rencana_penugasan: string;

  @IsNotEmpty({ message: 'tahun_penugasan_terakhir tidak boleh kosong' })
  tahun_penugasan_terakhir: number;

  @IsNotEmpty({ message: 'alamat tidak boleh kosong' })
  alamat: string;

  @IsNotEmpty({ message: 'tingkat_risiko tidak boleh kosong' })
  tingkat_risiko: string;

  @IsNotEmpty({ message: 'tujuan_penugasan tidak boleh kosong' })
  tujuan_penugasan: string;

  @IsOptional()
  surat_tugas_nomor?: string;

  @IsNotEmpty({ message: 'rencana_mulai tidak boleh kosong' })
  rencana_mulai: Date;

  @IsNotEmpty({ message: 'rencana_selesai tidak boleh kosong' })
  rencana_selesai: Date;

  @IsOptional()
  anggaran_diajukan?: number;

  @IsOptional()
  anggaran_disetujui?: number;

  @IsOptional()
  catatan_penting?: string;
}
