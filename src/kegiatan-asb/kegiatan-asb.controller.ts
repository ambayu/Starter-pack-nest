import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
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
  findAll(
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
    @Query('search') search?: string,
    
  ) {
    return this.kegiatanAsbService.findAll(
      Number(page) || 1,
      Number(perPage) || 10,
      search,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kegiatanAsbService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKegiatanAsbDto: UpdateKegiatanAsbDto,
  ) {
    return this.kegiatanAsbService.update(+id, updateKegiatanAsbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kegiatanAsbService.remove(+id);
  }
}
