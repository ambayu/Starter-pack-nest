import { IsNotEmpty, IsOptional, IsInt, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateKM1Dto {
  @IsOptional()
  @IsInt()
  id?: number; // auto increment

  @IsOptional()
  @IsString()
  rencana_penugasan?: string;

  @IsOptional()
  @IsInt({ message: 'tahun_penugasan_terakhir harus berupa angka' })
  tahun_penugasan_terakhir?: number;


  @IsOptional()
  @IsInt({ message: 'jumlah hari harus berupa angka' })
  jumlah_hari?: number;


  @IsOptional()
  @IsString({ message: 'alamat harus berupa teks' })
  alamat?: string;

  @IsOptional()
  @IsString({ message: 'tingkat_risiko harus berupa teks' })
  tingkat_risiko?: string;

  @IsOptional()
  @IsString({ message: 'tujuan_penugasan harus berupa teks' })
  tujuan_penugasan?: string;



  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'rencana_mulai harus berupa tanggal' })
  rencana_mulai?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'rencana_selesai harus berupa tanggal' })
  rencana_selesai?: Date;

  @IsOptional()
  anggaran_diajukan?: number;

  @IsOptional()
  anggaran_disetujui?: number;

  @IsOptional()
  @IsString()
  catatan_penting?: string;

  @IsOptional()
  ttd_katim?: number;

  @IsOptional()
  tgl_ttd_katim?: number;

  @IsOptional()
  ttd_ppj?: number;

  @IsOptional()
  tgl_ttd_ppj?: number;

  @IsOptional()
  ttd_pt?: number;

  @IsOptional()
  tgl_ttd_pt?: number;
}
