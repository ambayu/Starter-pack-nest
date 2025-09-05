import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { CreateKM4ProgramKerjaDto } from './create-km4-program-kerja.dto';

export class CreateKM4Dto {
  id: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateKM4ProgramKerjaDto)
  km4_program_kerja?: CreateKM4ProgramKerjaDto[];
}
