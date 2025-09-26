import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PelaporanService } from './pelaporan.service';
import { CreatePelaporanDto } from './dto/create-pelaporan.dto';
import { UpdatePelaporanDto } from './dto/update-pelaporan.dto';
import { successResponse } from 'src/utils/response.util';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
@UseGuards(JwtAuthGuard, PermissionGuard)

@Controller('pelaporan')
export class PelaporanController {
  constructor(private readonly pelaporanService: PelaporanService) { }

  // CREATE
  @Post()
  async create(@Body() createPelaporanDto: CreatePelaporanDto, @Req() req: any,
  ) {
    return this.pelaporanService.create({
      ...createPelaporanDto,
      createdBy: Number(req.user.id),
    });

  }

  // // FIND ALL
  // @Get()
  // async findAll() {
  //   const result = await this.pelaporanService.findAll();
  //   return successResponse('List pelaporan', result);
  // }

  // // FIND ONE
  // @Get(':id')
  // async findOne(@Param('id', ParseIntPipe) id: number) {
  //   const result = await this.pelaporanService.findOne(id);
  //   return successResponse(`Detail pelaporan #${id}`, result);
  // }

  // // UPDATE
  // @Put(':id')
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updatePelaporanDto: UpdatePelaporanDto,
  // ) {
  //   const result = await this.pelaporanService.update(id, updatePelaporanDto);
  //   return successResponse(`Pelaporan #${id} berhasil diperbarui`, result);
  // }

  // // DELETE
  // @Delete(':id')
  // async remove(@Param('id', ParseIntPipe) id: number) {
  //   const result = await this.pelaporanService.remove(id);
  //   return successResponse(`Pelaporan #${id} berhasil dihapus`, result);
  // }
}
