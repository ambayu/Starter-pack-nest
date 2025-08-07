import { PartialType } from '@nestjs/mapped-types';
import { CreateSubKegiatanHspkDto } from './create-sub-kegiatan-hspk.dto';

export class UpdateSubKegiatanHspkDto extends PartialType(CreateSubKegiatanHspkDto) {}
