import { IsNotEmpty } from "class-validator";

export class CreateKelompokPengawasanDto {
    id: number;
    @IsNotEmpty({ message: 'nama kelompok pengawasan tidak boleh kosong' })
    name: string;
    @IsNotEmpty({ message: 'jenis pengawasan tidak boleh kosong' })
    id_jenis_pengawasan: number;
    createdBy?: number;
    updatedBy?: number;
    createdAt?: Date;
    deletedAt?: Date;

}
