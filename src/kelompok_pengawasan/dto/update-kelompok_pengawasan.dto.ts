import { PartialType } from '@nestjs/mapped-types';
import { CreateKelompokPengawasanDto } from './create-kelompok_pengawasan.dto';

export class UpdateKelompokPengawasanDto extends PartialType(CreateKelompokPengawasanDto) {}
