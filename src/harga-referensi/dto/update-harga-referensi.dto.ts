import { PartialType } from '@nestjs/mapped-types';
import { CreateHargaReferensiDto } from './create-harga-referensi.dto';

export class UpdateHargaReferensiDto extends PartialType(CreateHargaReferensiDto) {}
