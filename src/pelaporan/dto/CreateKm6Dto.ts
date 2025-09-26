import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateKm6Dto {
  @IsOptional()
  @IsInt()
  id_pelaporan?: number;

  @IsOptional()
  @IsString()
  uraian?: string;

  @IsOptional()
  @IsString()
  id_user_penanggung?: string;

  @IsOptional()
  @IsString()
  tanggal_1?: string;

  @IsOptional()
  @IsString()
  tanggal_2?: string;

  @IsOptional()
  @IsString()
  tanggal_3?: string;

  @IsOptional()
  @IsString()
  tanggal_4?: string;
}
