import { IsNotEmpty } from "class-validator";

export class CreateItemKegiatanHspkDto {

    @IsNotEmpty({ message: 'Uraian tidak boleh kosong' })
    uraian: string;
    @IsNotEmpty({ message: 'Id Sub Kegiatan HSPK tidak boleh kosong' })
    id_sub_kegiatan_HSPK: number;
}
