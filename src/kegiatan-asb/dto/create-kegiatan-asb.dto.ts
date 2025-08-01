import { IsNotEmpty } from "class-validator";

export class CreateKegiatanAsbDto {

    @IsNotEmpty({ message: 'Kode tidak boleh kosong' })
    kode: string;

    @IsNotEmpty({ message: 'Uraian tidak boleh kosong' })
    uraian: string;

    @IsNotEmpty({ message: 'Id Kelompok ASB tidak boleh kosong' })
    id_kelompok_asb: number;


}
