import { PartialType } from '@nestjs/mapped-types';
import { CreateKomponenHspkDto } from './create-komponen-hspk.dto';

export class UpdateKomponenHspkDto extends PartialType(CreateKomponenHspkDto) {}
