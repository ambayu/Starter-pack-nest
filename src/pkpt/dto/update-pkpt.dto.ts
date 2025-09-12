import { PartialType } from '@nestjs/mapped-types';
import { CreatePkptDto } from './create-pkpt.dto';

export class UpdatePkptDto extends PartialType(CreatePkptDto) {}
