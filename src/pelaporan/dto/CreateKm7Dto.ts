import { IsOptional, IsString } from "class-validator";

export class CreateKm7Dto {
    @IsOptional()
    @IsString()
    halaman_lhr?: string;

    @IsOptional()
    @IsString()
    id_pelaporan?: string;

    @IsOptional()
    @IsString()
    masalah?: string;

    @IsOptional()
    @IsString()
    nomor_kkr?: string;
}
