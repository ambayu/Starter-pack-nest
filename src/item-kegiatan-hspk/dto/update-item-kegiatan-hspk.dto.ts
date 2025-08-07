import { PartialType } from '@nestjs/mapped-types';
import { CreateItemKegiatanHspkDto } from './create-item-kegiatan-hspk.dto';

export class UpdateItemKegiatanHspkDto extends PartialType(CreateItemKegiatanHspkDto) {}
