import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KategoriKomponenService } from './kategori-komponen.service';
import { CreateKategoriKomponenDto } from './dto/create-kategori-komponen.dto';
import { UpdateKategoriKomponenDto } from './dto/update-kategori-komponen.dto';

@Controller('kategori-komponen')
export class KategoriKomponenController {
  constructor(private readonly kategoriKomponenService: KategoriKomponenService) {}

  @Post()
  create(@Body() createKategoriKomponenDto: CreateKategoriKomponenDto) {
    return this.kategoriKomponenService.create(createKategoriKomponenDto);
  }

  @Get()
  findAll() {
    return this.kategoriKomponenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kategoriKomponenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKategoriKomponenDto: UpdateKategoriKomponenDto) {
    return this.kategoriKomponenService.update(+id, updateKategoriKomponenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kategoriKomponenService.remove(+id);
  }
}
