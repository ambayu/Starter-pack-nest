import { PartialType } from '@nestjs/mapped-types';
import { CreateKegiatanHspkDto } from './create-kegiatan-hspk.dto';

export class UpdateKegiatanHspkDto extends PartialType(CreateKegiatanHspkDto) {}
