import { PartialType } from '@nestjs/mapped-types';
import { CreatePelaporanDto } from './create-pelaporan.dto';

export class UpdatePelaporanDto extends PartialType(CreatePelaporanDto) {}
