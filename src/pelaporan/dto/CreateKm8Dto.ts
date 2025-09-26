import { IsOptional, IsString } from "class-validator";

export class CreateKm8Dto {
    @IsOptional()
    @IsString()
    kondisi?: string;

    @IsOptional()
    @IsString()
    id_pelaporan?: string;

    @IsOptional()
    @IsString()
    kriteria?: string;

    @IsOptional()
    @IsString()
    sebab?: string;

    @IsOptional()
    @IsString()
    akibat?: string;

    @IsOptional()
    @IsString()
    rekomendasi?: string;

    @IsOptional()
    @IsString()
    rencana_tindak_lanjut?: string;

    @IsOptional()
    @IsString()
    komentar_auditi?: string;

    @IsOptional()
    @IsString()
    komentar_auditor?: string;

    @IsOptional()
    @IsString()
    ket?: string;
}
