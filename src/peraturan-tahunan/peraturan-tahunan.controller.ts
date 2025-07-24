import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PeraturanTahunanService } from './peraturan-tahunan.service';
import { CreatePeraturanTahunanDto } from './dto/create-peraturan-tahunan.dto';
import { UpdatePeraturanTahunanDto } from './dto/update-peraturan-tahunan.dto';

@Controller('peraturan-tahunan')
export class PeraturanTahunanController {
  constructor(private readonly peraturanTahunanService: PeraturanTahunanService) { }

  @Post()
  create(@Body() createPeraturanTahunanDto: CreatePeraturanTahunanDto) {
    return this.peraturanTahunanService.create(createPeraturanTahunanDto);
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
    @Query('tahun') tahun?: string,
    @Query('peraturan') peraturan?: string,
  ) {
    return this.peraturanTahunanService.findAll(
      Number(page) || 1,
      Number(perPage) || 10,
      tahun,
      peraturan,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peraturanTahunanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeraturanTahunanDto: UpdatePeraturanTahunanDto) {
    return this.peraturanTahunanService.update(+id, updatePeraturanTahunanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peraturanTahunanService.remove(+id);
  }
}
