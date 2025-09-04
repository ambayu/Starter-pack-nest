import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSusunanTimDto {
  id: number;

  @IsNotEmpty({ message: 'nip tidak boleh kosong' })
  nip: string;

  @IsNotEmpty({ message: 'peran tidak boleh kosong' })
  id_peran: number;

  @IsOptional()
  satuan?: string;
  honorarium?: number;
  alokasi_anggaran?: number;
}
