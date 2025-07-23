import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KomponenAsbService } from './komponen-asb.service';
import { CreateKomponenAsbDto } from './dto/create-komponen-asb.dto';
import { UpdateKomponenAsbDto } from './dto/update-komponen-asb.dto';

@Controller('komponen-asb')
export class KomponenAsbController {
  constructor(private readonly komponenAsbService: KomponenAsbService) {}

  @Post()
  create(@Body() createKomponenAsbDto: CreateKomponenAsbDto) {
    return this.komponenAsbService.create(createKomponenAsbDto);
  }

  @Get()
  findAll() {
    return this.komponenAsbService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.komponenAsbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKomponenAsbDto: UpdateKomponenAsbDto) {
    return this.komponenAsbService.update(+id, updateKomponenAsbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.komponenAsbService.remove(+id);
  }
}
