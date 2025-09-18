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

  // @Get()
  // findAll(
  //   @Query('page') page: number,
  //   @Query('perPage') perPage: number,
  //   @Query('search') search?: string,
  //   @Query('orderBy') orderBy?: string,
  //   @Query('order') order?: string,
  // ) {
  //   return this.penugasanService.findAll(
  //     Number(page) || 1,
  //     Number(perPage) || 10,
  //     search,
  //     orderBy,
  //     order,
  //   );
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.penugasanService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePenugasanDto: UpdatePenugasanDto,
  // ) {
  //   return this.penugasanService.update(+id, updatePenugasanDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.penugasanService.remove(+id);
  // }
}
