import { IsNotEmpty } from "class-validator";

export class CreateItemPengawasanDto {
    id: number;
    @IsNotEmpty({ message: 'kelompok pengawasan tidak boleh kosong' })
    id_kelompok_pengawasan: number;
    @IsNotEmpty({ message: 'Name tidak boleh kosong' })
    name: string;
    createdBy?: number;
    updatedBy?: number;

}
