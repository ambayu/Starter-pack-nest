<<<<<<< HEAD
import { IsNotEmpty } from 'class-validator';

export class CreatePeraturanTahunanDto {
  @IsNotEmpty({ message: 'Tahun tidak boleh kosong' })
  tahun: number;
  @IsNotEmpty({ message: 'Peraturan tidak boleh kosong' })
=======
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePeraturanTahunanDto {
  @IsNotEmpty({ message: "Tahun tidak boleh kosong" })

  @IsNumber({}, { message: "Tahun harus berupa angka" })
  tahun: number;
  @IsNotEmpty({ message: "Peraturan tidak boleh kosong" })
>>>>>>> b5e8410964e0f6fc1f9f895cda66e3b361129fc4
  peraturan: string;
}
