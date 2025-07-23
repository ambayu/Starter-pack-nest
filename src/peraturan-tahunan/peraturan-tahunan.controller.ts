import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PeraturanTahunanService } from './peraturan-tahunan.service';
import { CreatePeraturanTahunanDto } from './dto/create-peraturan-tahunan.dto';
import { UpdatePeraturanTahunanDto } from './dto/update-peraturan-tahunan.dto';

@Controller('peraturan-tahunan')
export class PeraturanTahunanController {
  constructor(private readonly peraturanTahunanService: PeraturanTahunanService) {}

  @Post()
  create(@Body() createPeraturanTahunanDto: CreatePeraturanTahunanDto) {
    return this.peraturanTahunanService.create(createPeraturanTahunanDto);
  }

  @Get()
  findAll() {
    return this.peraturanTahunanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peraturanTahunanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeraturanTahunanDto: UpdatePeraturanTahunanDto) {
    return this.peraturanTahunanService.update(+id, updatePeraturanTahunanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peraturanTahunanService.remove(+id);
  }
}
