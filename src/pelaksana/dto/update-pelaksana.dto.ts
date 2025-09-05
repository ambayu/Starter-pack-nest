import { PartialType } from '@nestjs/mapped-types';
import { CreatePelaksanaDto } from './create-pelaksana.dto';

export class UpdatePelaksanaDto extends PartialType(CreatePelaksanaDto) {}
