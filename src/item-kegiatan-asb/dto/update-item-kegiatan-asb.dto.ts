import { PartialType } from '@nestjs/mapped-types';
import { CreateItemKegiatanAsbDto } from './create-item-kegiatan-asb.dto';

export class UpdateItemKegiatanAsbDto extends PartialType(CreateItemKegiatanAsbDto) {}
