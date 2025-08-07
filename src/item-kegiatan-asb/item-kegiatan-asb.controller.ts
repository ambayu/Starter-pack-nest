import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ItemKegiatanAsbService } from './item-kegiatan-asb.service';
import { CreateItemKegiatanAsbDto } from './dto/create-item-kegiatan-asb.dto';
import { UpdateItemKegiatanAsbDto } from './dto/update-item-kegiatan-asb.dto';

@Controller('item-kegiatan-asb')
export class ItemKegiatanAsbController {
  constructor(private readonly itemKegiatanAsbService: ItemKegiatanAsbService) { }

  @Post()
  create(@Body() createItemKegiatanAsbDto: CreateItemKegiatanAsbDto) {
    return this.itemKegiatanAsbService.create(createItemKegiatanAsbDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
    @Query('search') search?: string
  ) {
    return this.itemKegiatanAsbService.findAll(page, perPage, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemKegiatanAsbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemKegiatanAsbDto: UpdateItemKegiatanAsbDto) {
    return this.itemKegiatanAsbService.update(+id, updateItemKegiatanAsbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemKegiatanAsbService.remove(+id);
  }
}
