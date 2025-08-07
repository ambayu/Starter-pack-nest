import { PartialType } from '@nestjs/mapped-types';
import { CreateKelompokHspkDto } from './create-kelompok-hspk.dto';

export class UpdateKelompokHspkDto extends PartialType(CreateKelompokHspkDto) {}
