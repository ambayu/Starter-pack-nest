import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePeraturanTahunanDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  nama: string; // Assuming 'nama' is the same as 'peraturan'
  @IsNotEmpty({ message: 'Tahun tidak boleh kosong' })
  @IsNumber({}, { message: 'Tahun harus berupa angka' })
  tahun: number;
  @IsNotEmpty({ message: 'Peraturan tidak boleh kosong' })
  peraturan: string;
}
