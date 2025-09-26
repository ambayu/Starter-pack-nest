import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateKm5Dto {
  @IsInt()
  id_pelaporan?: number;

  @IsOptional()
  @IsString()
  komentar?: string;

  @IsOptional()
  @IsString()
  index_kka?: string;

  @IsOptional()
  @IsString()
  penyelesaian?: string;

  @IsOptional()
  @IsString()
  persetujuan?: string;
}
