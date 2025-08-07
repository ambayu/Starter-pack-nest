import { IsNotEmpty } from 'class-validator';

export class CreateKomponenAsbDto {
  @IsNotEmpty({ message: 'Id Satuan tidak boleh kosong' })
  id_satuan: number;



  @IsNotEmpty({ message: 'Id item kegiatan tidak boleh kosong' })
  id_item_kegiatan_asb: number;


  uraian: string;
  koefisien: number;
  harga_satuan: number;
  jumlah_harga: number;
}
