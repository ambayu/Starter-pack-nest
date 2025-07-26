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
import { SatuanService } from './satuan.service';
import { CreateSatuanDto } from './dto/create-satuan.dto';
import { UpdateSatuanDto } from './dto/update-satuan.dto';

@Controller('satuan')
export class SatuanController {
  constructor(private readonly satuanService: SatuanService) {}

  @Post()
  create(@Body() createSatuanDto: CreateSatuanDto) {
    return this.satuanService.create(createSatuanDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
    @Query('search') search?: string,
  ) {
    return this.satuanService.findAll(
      Number(page) || 1,
      Number(perPage) || 10,
      search,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.satuanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSatuanDto: UpdateSatuanDto) {
    return this.satuanService.update(+id, updateSatuanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.satuanService.remove(+id);
  }
}
