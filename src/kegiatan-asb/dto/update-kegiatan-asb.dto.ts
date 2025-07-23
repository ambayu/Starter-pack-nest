import { PartialType } from '@nestjs/mapped-types';
import { CreateKegiatanAsbDto } from './create-kegiatan-asb.dto';

export class UpdateKegiatanAsbDto extends PartialType(CreateKegiatanAsbDto) {}
