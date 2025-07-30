import { IsNotEmpty } from 'class-validator';

export class CreateKomponenAsbDto {
  @IsNotEmpty({ message: 'Id Satuan tidak boleh kosong' })
  id_satuan: number;

  @IsNotEmpty({ message: 'Id sub kegiatan tidak boleh kosong' })
  id_sub_kegiatan_asb: number;
  
  @IsNotEmpty({ message: 'Id Kegiatan ASB tidak boleh kosong' })
  id_kegiatan_asb: number;

  uraian: string;
  koefisien: number;
  harga_satuan: number;
  jumlah_harga: number;
}
