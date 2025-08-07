import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { KomponenHspkService } from './komponen-hspk.service';
import { CreateKomponenHspkDto } from './dto/create-komponen-hspk.dto';
import { UpdateKomponenHspkDto } from './dto/update-komponen-hspk.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('komponen-hspk')
export class KomponenHspkController {
  constructor(private readonly komponenHspkService: KomponenHspkService) { }

  @Post()
  create(@Body() createKomponenAsbDto: CreateKomponenHspkDto) {
    return this.komponenHspkService.create(createKomponenAsbDto);
  }


  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
    @Query('search') search?: string,
  ) {
    return this.komponenHspkService.findAll(
      Number(page) || 1,
      Number(perPage) || 10,
      search,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.komponenHspkService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKomponenAsbDto: UpdateKomponenHspkDto,
  ) {
    return this.komponenHspkService.update(+id, updateKomponenAsbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.komponenHspkService.remove(+id);
  }



  //import excel
  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  importExcel(@UploadedFile() file: Express.Multer.File) {
    return this.komponenHspkService.importExcel(file.buffer);
  }

}