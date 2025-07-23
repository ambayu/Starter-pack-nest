import { PartialType } from '@nestjs/mapped-types';
import { CreateKomponenAsbDto } from './create-komponen-asb.dto';

export class UpdateKomponenAsbDto extends PartialType(CreateKomponenAsbDto) {}
