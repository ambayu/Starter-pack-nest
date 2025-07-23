import { IsNotEmpty } from 'class-validator';

export class CreateHargaReferensiDto {
  @IsNotEmpty({ message: 'Tahun tidak boleh kosong' })
  nama: string;

  @IsNotEmpty({ message: 'Harga tidak boleh kosong' })
  harga: number;

  @IsNotEmpty({ message: 'Satuan tidak boleh kosong' })
  id_peraturan_tahunan: number;

  @IsNotEmpty({ message: 'Satuan tidak boleh kosong' })
  id_satuan: number;
}
