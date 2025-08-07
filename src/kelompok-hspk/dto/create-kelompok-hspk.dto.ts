import { IsNotEmpty } from "class-validator"

export class CreateKelompokHspkDto {
    @IsNotEmpty({ message: "kode tidak boleh kosong" })
    kode: string
    @IsNotEmpty({ message: "uraian tidak boleh kosong" })
    uraian: string

}
