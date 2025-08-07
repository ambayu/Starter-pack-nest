import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { KegiatanHspkService } from './kegiatan-hspk.service';
import { CreateKegiatanHspkDto } from './dto/create-kegiatan-hspk.dto';
import { UpdateKegiatanHspkDto } from './dto/update-kegiatan-hspk.dto';

@Controller('kegiatan-hspk')
export class KegiatanHspkController {
  constructor(private readonly kegiatanHspkService: KegiatanHspkService) { }

  @Post()
  create(@Body() data: CreateKegiatanHspkDto) {
    return this.kegiatanHspkService.create(data);
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
    @Query('search') search?: string,

  ) {
    return this.kegiatanHspkService.findAll(
      Number(page) || 1,
      Number(perPage) || 10,
      search,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kegiatanHspkService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateKegiatanHspkDto,
  ) {
    return this.kegiatanHspkService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kegiatanHspkService.remove(+id);
  }

}
