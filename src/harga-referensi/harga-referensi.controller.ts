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
import { CreateHargaReferensiDto } from './dto/create-harga-referensi.dto';
import { UpdateHargaReferensiDto } from './dto/update-harga-referensi.dto';
import { HargaReferensiService } from './harga-referensi.service';

@Controller('harga-referensi')
export class HargaReferensiController {
  constructor(private readonly hargaReferensiService: HargaReferensiService) {}

  @Post()
  create(@Body() createHargaReferensiDto: CreateHargaReferensiDto) {
    return this.hargaReferensiService.create(createHargaReferensiDto);
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
    @Query('search') search?: string,
  ) {
    return this.hargaReferensiService.findAll(
      Number(page) || 1,
      Number(perPage) || 10,
      search,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hargaReferensiService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHargaReferensiDto: UpdateHargaReferensiDto,
  ) {
    return this.hargaReferensiService.update(+id, updateHargaReferensiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hargaReferensiService.remove(+id);
  }
}
