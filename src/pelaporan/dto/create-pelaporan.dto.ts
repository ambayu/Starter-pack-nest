import { Type } from "class-transformer";
import {
    IsDate,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested
} from "class-validator";
import { CreateKm5Dto } from "./CreateKm5Dto";

import { CreateKm7Dto } from "./CreateKm7Dto";
import { CreateKm8Dto } from "./CreateKm8Dto";
import { CreateKm6Dto } from "./CreateKm6Dto";

export class CreateUrutanPekerjaanPelaporanDto {
    @IsNotEmpty()
    @IsString()
    judul: string;

    @IsOptional()
    @IsInt()
    id_user_penanggung?: number; // sesuai schema Int

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    tanggal_1?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    tanggal_2?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    tanggal_3?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    tanggal_4?: Date;
}

export class CreatePelaporanDto {

    @IsOptional()
    @IsInt()
    id?: number;

    @IsNotEmpty({ message: 'jenis penugasan tidak boleh kosong' })
    @IsInt()
    id_jenis_penugasan: number;

    @IsNotEmpty()
    @IsString()
    judul_pelaporan: string;

    @IsOptional()
    createdBy?: number;

    @IsOptional()
    @IsString()
    alamat?: string;

    @IsOptional()
    @IsString()
    periode?: string;

    @IsOptional()
    @IsString()
    no_kp?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    tgl_kp?: Date;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateUrutanPekerjaanPelaporanDto)
    Urutan_pekerjaan_pelaporan?: CreateUrutanPekerjaanPelaporanDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateKm5Dto)
    km5?: CreateKm5Dto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateKm6Dto)
    km6?: CreateKm6Dto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateKm7Dto)
    km7?: CreateKm7Dto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateKm8Dto)
    km8?: CreateKm8Dto[];
}
