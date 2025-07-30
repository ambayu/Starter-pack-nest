import { IsNotEmpty } from "class-validator";

export class CreateSubKegiatanAsbDto {

    @IsNotEmpty({ message: 'Kode tidak boleh kosong' })
    kode:string;
    @IsNotEmpty({ message: 'Uraian tidak boleh kosong' })
    uraian:string;
    @IsNotEmpty({ message: 'Id Kegiatan ASB tidak boleh kosong' })
    id_kegiatan_asb:number;
    
}
