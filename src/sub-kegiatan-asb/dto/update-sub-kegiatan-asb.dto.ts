import { PartialType } from '@nestjs/mapped-types';
import { CreateSubKegiatanAsbDto } from './create-sub-kegiatan-asb.dto';

export class UpdateSubKegiatanAsbDto extends PartialType(CreateSubKegiatanAsbDto) {}
