import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HargaReferensiService } from './harga-referensi.service';
import { CreateHargaReferensiDto } from './dto/create-harga-referensi.dto';
import { UpdateHargaReferensiDto } from './dto/update-harga-referensi.dto';

@Controller('harga-referensi')
export class HargaReferensiController {
  constructor(private readonly hargaReferensiService: HargaReferensiService) {}

  @Post()
  create(@Body() createHargaReferensiDto: CreateHargaReferensiDto) {
    return this.hargaReferensiService.create(createHargaReferensiDto);
  }

  @Get()
  findAll() {
    return this.hargaReferensiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hargaReferensiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHargaReferensiDto: UpdateHargaReferensiDto) {
    return this.hargaReferensiService.update(+id, updateHargaReferensiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hargaReferensiService.remove(+id);
  }
}
