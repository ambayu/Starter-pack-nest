import { IsNotEmpty } from "class-validator";

export class CreatePkptDto {
    id: number;
    @IsNotEmpty({ message: 'area penugasan tidak boleh kosong' })
    area_pengawasan: string;
    @IsNotEmpty({ message: 'tujuan penugasan tidak boleh kosong' })
    tujuan: string;
    @IsNotEmpty({ message: ' jenis pengawasan tidak boleh kosong' })
    id_jenis_pengawasan: number;
    @IsNotEmpty({ message: ' ruang lingkup tidak boleh kosong' })
    ruang_lingkup: string;
    @IsNotEmpty({ message: ' tingkat risiko tidak boleh kosong' })
    tingkat_resiko: string;
    createdBy?: number;
    updatedBy?: number;
    createdAt?: Date;
    deletedAt?: Date;

}
