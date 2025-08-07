import { IsNotEmpty } from "class-validator";

export class CreateKegiatanHspkDto {
    
        @IsNotEmpty({ message: 'Kode tidak boleh kosong' })
        kode: string;
    
        @IsNotEmpty({ message: 'Uraian tidak boleh kosong' })
        uraian: string;
    
        @IsNotEmpty({ message: 'Id Kelompok HSPK tidak boleh kosong' })
        id_kelompok_HSPK: number;
}
