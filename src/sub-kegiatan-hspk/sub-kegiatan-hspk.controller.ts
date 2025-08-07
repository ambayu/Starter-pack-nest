import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubKegiatanHspkService } from './sub-kegiatan-hspk.service';
import { CreateSubKegiatanHspkDto } from './dto/create-sub-kegiatan-hspk.dto';
import { UpdateSubKegiatanHspkDto } from './dto/update-sub-kegiatan-hspk.dto';

@Controller('sub-kegiatan-hspk')
export class SubKegiatanHspkController {
  constructor(private readonly SubKegiatanHspkService: SubKegiatanHspkService) { }

  @Post()
  create(@Body() createSubKegiatanAsbDto: CreateSubKegiatanHspkDto) {
    return this.SubKegiatanHspkService.create(createSubKegiatanAsbDto);
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
    @Query('search') search?: string,
  ) {
    return this.SubKegiatanHspkService.findAll(Number(page) || 1, Number(perPage) || 10, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.SubKegiatanHspkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubKegiatanAsbDto: UpdateSubKegiatanHspkDto) {
    return this.SubKegiatanHspkService.update(+id, updateSubKegiatanAsbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.SubKegiatanHspkService.remove(+id);
  }
}

