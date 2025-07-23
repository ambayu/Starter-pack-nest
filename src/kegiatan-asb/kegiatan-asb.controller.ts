import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KegiatanAsbService } from './kegiatan-asb.service';
import { CreateKegiatanAsbDto } from './dto/create-kegiatan-asb.dto';
import { UpdateKegiatanAsbDto } from './dto/update-kegiatan-asb.dto';

@Controller('kegiatan-asb')
export class KegiatanAsbController {
  constructor(private readonly kegiatanAsbService: KegiatanAsbService) {}

  @Post()
  create(@Body() createKegiatanAsbDto: CreateKegiatanAsbDto) {
    return this.kegiatanAsbService.create(createKegiatanAsbDto);
  }

  @Get()
  findAll() {
    return this.kegiatanAsbService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kegiatanAsbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKegiatanAsbDto: UpdateKegiatanAsbDto) {
    return this.kegiatanAsbService.update(+id, updateKegiatanAsbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kegiatanAsbService.remove(+id);
  }
}
