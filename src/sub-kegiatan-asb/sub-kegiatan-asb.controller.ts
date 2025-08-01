import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubKegiatanAsbService } from './sub-kegiatan-asb.service';
import { CreateSubKegiatanAsbDto } from './dto/create-sub-kegiatan-asb.dto';
import { UpdateSubKegiatanAsbDto } from './dto/update-sub-kegiatan-asb.dto';

@Controller('sub-kegiatan-asb')
export class SubKegiatanAsbController {
  constructor(private readonly subKegiatanAsbService: SubKegiatanAsbService) { }

  @Post()
  create(@Body() createSubKegiatanAsbDto: CreateSubKegiatanAsbDto) {
    return this.subKegiatanAsbService.create(createSubKegiatanAsbDto);
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
    @Query('search') search?: string,
    @Query('id_kegiatan_asb') id_kegiatan_asb?: number
  ) {
    return this.subKegiatanAsbService.findAll(Number(page) || 1, Number(perPage) || 10, search, id_kegiatan_asb);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subKegiatanAsbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubKegiatanAsbDto: UpdateSubKegiatanAsbDto) {
    return this.subKegiatanAsbService.update(+id, updateSubKegiatanAsbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subKegiatanAsbService.remove(+id);
  }
}
