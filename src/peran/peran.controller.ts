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
import { PeranService } from './peran.service';
import { CreatePeranDto } from './dto/create-peran.dto';
import { UpdatePeranDto } from './dto/update-peran.dto';

@Controller('peran')
export class PeranController {
  constructor(private readonly peranService: PeranService) {}

  @Post()
  create(@Body() createPeranDto: CreatePeranDto) {
    return this.peranService.create(createPeranDto);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('search') search?: string,
    @Query('orderBy') orderBy?: string,
    @Query('order') order?: string,
  ) {
    return this.peranService.findAll(
      Number(page) || 1,
      Number(perPage) || 10,
      search,
      orderBy,
      order,
      
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peranService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeranDto: UpdatePeranDto) {
    return this.peranService.update(+id, updatePeranDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peranService.remove(+id);
  }
}
