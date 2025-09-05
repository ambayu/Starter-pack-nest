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
import { PelaksanaService } from './pelaksana.service';
import { CreatePelaksanaDto } from './dto/create-pelaksana.dto';
import { UpdatePelaksanaDto } from './dto/update-pelaksana.dto';

@Controller('pelaksana')
export class PelaksanaController {
  constructor(private readonly pelaksanaService: PelaksanaService) {}

  @Post()
  create(@Body() createPelaksanaDto: CreatePelaksanaDto) {
    return this.pelaksanaService.create(createPelaksanaDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
    @Query('search') search?: string,
    @Query('orderBy') orderBy?: string,
    @Query('order') order?: string,
  ) {
    return this.pelaksanaService.findAll(
      Number(page) || 1,
      Number(perPage) || 10,
      search,
      orderBy,
      order,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pelaksanaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePelaksanaDto: UpdatePelaksanaDto,
  ) {
    return this.pelaksanaService.update(+id, updatePelaksanaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pelaksanaService.remove(+id);
  }
}
