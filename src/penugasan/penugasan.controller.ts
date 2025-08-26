import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PenugasanService } from './penugasan.service';
import { CreatePenugasanDto } from './dto/create-penugasan.dto';
import { UpdatePenugasanDto } from './dto/update-penugasan.dto';

@Controller('penugasan')
export class PenugasanController {
  constructor(private readonly penugasanService: PenugasanService) {}

  @Post()
  create(@Body() createPenugasanDto: CreatePenugasanDto) {
    return this.penugasanService.create(createPenugasanDto);
  }

  @Get()
  findAll() {
    return this.penugasanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.penugasanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePenugasanDto: UpdatePenugasanDto) {
    return this.penugasanService.update(+id, updatePenugasanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.penugasanService.remove(+id);
  }
}
