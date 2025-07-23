import { PartialType } from '@nestjs/mapped-types';
import { CreateKategoriKomponenDto } from './create-kategori-komponen.dto';

export class UpdateKategoriKomponenDto extends PartialType(CreateKategoriKomponenDto) {}
