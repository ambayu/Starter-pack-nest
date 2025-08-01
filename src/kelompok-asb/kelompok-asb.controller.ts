import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { KelompokAsbService } from './kelompok-asb.service';
import { CreateKelompokAsbDto } from './dto/create-kelompok-asb.dto';
import { UpdateKelompokAsbDto } from './dto/update-kelompok-asb.dto';

@Controller('kelompok-asb')
export class KelompokAsbController {
  constructor(private readonly kelompokAsbService: KelompokAsbService) { }

  @Post()
  create(@Body() createKelompokAsbDto: CreateKelompokAsbDto) {
    return this.kelompokAsbService.create(createKelompokAsbDto);
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
    @Query('search') search?: string,

  ) {
    return this.kelompokAsbService.findAll(Number(page) || 1, Number(perPage) || 10, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kelompokAsbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKelompokAsbDto: UpdateKelompokAsbDto) {
    return this.kelompokAsbService.update(+id, updateKelompokAsbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kelompokAsbService.remove(+id);
  }
}
