import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePeraturanTahunanDto {
  @IsNotEmpty({ message: "Tahun tidak boleh kosong" })

  @IsNumber({}, { message: "Tahun harus berupa angka" })
  tahun: number;
  @IsNotEmpty({ message: "Peraturan tidak boleh kosong" })
  peraturan: string;
}
