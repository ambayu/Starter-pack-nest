import { IsNotEmpty } from "class-validator";

export class CreateSatuanDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  nama: string;
}
