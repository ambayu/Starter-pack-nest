import { IsNotEmpty } from 'class-validator';

export class CreateKategoriKomponenDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  nama: string;
}
