import { IsNotEmpty } from "class-validator"

export class CreateItemKegiatanAsbDto {



    @IsNotEmpty({ message: 'Id Sub Kegiatan ASB tidak boleh kosong' })
    id_sub_kegiatan_asb: number

    @IsNotEmpty({ message: 'Uraian tidak boleh kosong' })
    uraian: string
}
