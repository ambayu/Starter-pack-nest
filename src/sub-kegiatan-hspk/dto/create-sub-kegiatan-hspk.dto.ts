import { IsEmpty, IsNotEmpty } from "class-validator";

export class CreateSubKegiatanHspkDto {
    @IsNotEmpty({ message: 'Kode tidak boleh kosong' })
    kode: string;
    @IsNotEmpty({ message: 'Uraian tidak boleh kosong' })
    uraian: string;
    @IsNotEmpty({ message: 'Id Kegiatan HSPK tidak boleh kosong' })
    id_kegiatan_HSPK: number;
}
