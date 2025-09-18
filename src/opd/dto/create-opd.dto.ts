import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateOpdDto {
    @IsString()
    @IsNotEmpty()
    kode: string;

    @IsInt()
    id_skpd: number;

    @IsOptional()
    @IsInt()
    id_skpd_parent?: number;

    @IsOptional()
    @IsString()
    skpd_parent?: string;

    @IsString()
    @IsNotEmpty()
    nama: string;

    @IsOptional()
    @IsString()
    alamat?: string;

    createdBy?: number;
    updatedBy?: number;
}
