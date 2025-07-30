import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubKegiatanAsbService } from './sub-kegiatan-asb.service';
import { CreateSubKegiatanAsbDto } from './dto/create-sub-kegiatan-asb.dto';
import { UpdateSubKegiatanAsbDto } from './dto/update-sub-kegiatan-asb.dto';

@Controller('sub-kegiatan-asb')
export class SubKegiatanAsbController {
  constructor(private readonly subKegiatanAsbService: SubKegiatanAsbService) {}

  @Post()
  create(@Body() createSubKegiatanAsbDto: CreateSubKegiatanAsbDto) {
    return this.subKegiatanAsbService.create(createSubKegiatanAsbDto);
  }

  @Get()
  findAll() {
    return this.subKegiatanAsbService.findAll();
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
