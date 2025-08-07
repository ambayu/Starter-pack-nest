import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ItemKegiatanHspkService } from './item-kegiatan-hspk.service';
import { CreateItemKegiatanHspkDto } from './dto/create-item-kegiatan-hspk.dto';
import { UpdateItemKegiatanHspkDto } from './dto/update-item-kegiatan-hspk.dto';

@Controller('item-kegiatan-hspk')
export class ItemKegiatanHspkController {
  constructor(private readonly itemKegiatanHspkService: ItemKegiatanHspkService) { }

  @Post()
  create(@Body() createItemKegiatanAsbDto: CreateItemKegiatanHspkDto) {
    return this.itemKegiatanHspkService.create(createItemKegiatanAsbDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
    @Query('search') search?: string
  ) {
    return this.itemKegiatanHspkService.findAll(page, perPage, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemKegiatanHspkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemKegiatanAsbDto: UpdateItemKegiatanHspkDto) {
    return this.itemKegiatanHspkService.update(+id, updateItemKegiatanAsbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemKegiatanHspkService.remove(+id);
  }
}
