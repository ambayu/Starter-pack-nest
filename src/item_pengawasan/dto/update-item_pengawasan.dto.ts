import { PartialType } from '@nestjs/mapped-types';
import { CreateItemPengawasanDto } from './create-item_pengawasan.dto';

export class UpdateItemPengawasanDto extends PartialType(CreateItemPengawasanDto) {}
