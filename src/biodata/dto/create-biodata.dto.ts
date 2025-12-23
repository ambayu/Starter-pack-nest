import { IsInt, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateBiodataDto {
  @IsInt()
  id_user: number;

  @IsOptional() @IsString()
  alamat?: string;

  @IsOptional() @IsString()
  no_telp?: string;

  @IsOptional() @IsString()
  kota?: string;

  @IsOptional() @IsString()
  kode_pos?: string;

  @IsOptional() @IsString()
  photo?: string;

  @IsOptional() @IsDateString()
  tanggal_lahir?: Date;

  @IsOptional() @IsString()
  jenis_kelamin?: string;
}
