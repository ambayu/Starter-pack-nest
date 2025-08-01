import { PartialType } from '@nestjs/mapped-types';
import { CreateKelompokAsbDto } from './create-kelompok-asb.dto';

export class UpdateKelompokAsbDto extends PartialType(CreateKelompokAsbDto) {}
