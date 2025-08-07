import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { KelompokHspkService } from './kelompok-hspk.service';
import { CreateKelompokHspkDto } from './dto/create-kelompok-hspk.dto';
import { UpdateKelompokHspkDto } from './dto/update-kelompok-hspk.dto';

@Controller('kelompok-hspk')
export class KelompokHspkController {
  constructor(private readonly kelompokHspkService: KelompokHspkService) { }

  @Post()
  create(@Body() data: CreateKelompokHspkDto) {
    return this.kelompokHspkService.create(data);
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
    @Query('search') search?: string,

  ) {
    return this.kelompokHspkService.findAll(Number(page) || 1, Number(perPage) || 10, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kelompokHspkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateKelompokHspkDto) {
    return this.kelompokHspkService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kelompokHspkService.remove(+id);
  }
}
