import { IsNotEmpty } from "class-validator";

export class CreateKegiatanAsbDto {

    @IsNotEmpty({ message: 'Kode tidak boleh kosong' })
    kode: string;
    
    @IsNotEmpty({ message: 'Uraian tidak boleh kosong' })
    uraian: string;
    @IsNotEmpty({ message: 'Id Satuan tidak boleh kosong' })
    id_satuan: number;
    @IsNotEmpty({ message: 'Id Peraturan Tahunan tidak boleh kosong' })
    id_peraturan_tahunan: number;

}
