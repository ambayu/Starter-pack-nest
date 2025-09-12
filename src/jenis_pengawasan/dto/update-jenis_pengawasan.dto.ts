import { PartialType } from '@nestjs/mapped-types';
import { CreateJenisPengawasanDto } from './create-jenis_pengawasan.dto';

export class UpdateJenisPengawasanDto extends PartialType(CreateJenisPengawasanDto) {}
