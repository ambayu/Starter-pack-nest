import { IsNotEmpty } from 'class-validator';

export class CreatePeranDto {
  @IsNotEmpty({ message: 'peran tidak boleh kosong' })
  nama: string;

}
