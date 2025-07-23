import { IsNotEmpty } from "class-validator";

export class CreatePeraturanTahunanDto {
    @IsNotEmpty({ message: "Tahun tidak boleh kosong" })
  tahun: number;
    @IsNotEmpty({ message: "Peraturan tidak boleh kosong" })
  peraturan: string;
}
