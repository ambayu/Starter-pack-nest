import { PartialType } from '@nestjs/mapped-types';
import { CreatePeraturanTahunanDto } from './create-peraturan-tahunan.dto';

export class UpdatePeraturanTahunanDto extends PartialType(CreatePeraturanTahunanDto) {}
