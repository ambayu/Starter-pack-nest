import { IsNotEmpty } from "class-validator";

export class CreateKelompokPengawasanDto {
    id: number;
    @IsNotEmpty({ message: 'nama kelompok pengawasan tidak boleh kosong' })
    name: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    deletedAt?: Date;

}
