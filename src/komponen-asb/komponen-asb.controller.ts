import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { KomponenAsbService } from './komponen-asb.service';
import { CreateKomponenAsbDto } from './dto/create-komponen-asb.dto';
import { UpdateKomponenAsbDto } from './dto/update-komponen-asb.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('komponen-asb')
export class KomponenAsbController {
  constructor(private readonly komponenAsbService: KomponenAsbService) { }

  @Post()
  create(@Body() createKomponenAsbDto: CreateKomponenAsbDto) {
    return this.komponenAsbService.create(createKomponenAsbDto);
  }


  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
    @Query('search') search?: string,
  ) {
    return this.komponenAsbService.findAll(
      Number(page) || 1,
      Number(perPage) || 10,
      search,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.komponenAsbService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKomponenAsbDto: UpdateKomponenAsbDto,
  ) {
    return this.komponenAsbService.update(+id, updateKomponenAsbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.komponenAsbService.remove(+id);
  }



  //import excel
  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  importExcel(@UploadedFile() file: Express.Multer.File) {
    return this.komponenAsbService.importExcel(file.buffer);
  }

}

