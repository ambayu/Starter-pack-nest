// create-km4-auditors.dto.ts
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateKM4AuditorsDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsInt()
  id_km4_program_kerja?: number; // otomatis dari relasi

  @IsNotEmpty()
  @IsString()
  nama: string;

  @IsOptional()
  @IsString()
  nip?: string;
}
