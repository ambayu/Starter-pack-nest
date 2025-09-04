import { PartialType } from '@nestjs/mapped-types';
import { CreateJenisPenugasanDto } from './create-jenis-penugasan.dto';

export class UpdateJenisPenugasanDto extends PartialType(CreateJenisPenugasanDto) {}
