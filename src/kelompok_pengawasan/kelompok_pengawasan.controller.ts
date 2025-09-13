import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { KelompokPengawasanService } from './kelompok_pengawasan.service';
import { CreateKelompokPengawasanDto } from './dto/create-kelompok_pengawasan.dto';
import { UpdateKelompokPengawasanDto } from './dto/update-kelompok_pengawasan.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/guard/permission.guard';

@UseGuards(JwtAuthGuard, PermissionGuard) // default semua endpoint cek JWT + permission
@Controller('kelompok-pengawasan')
export class KelompokPengawasanController {
  constructor(private readonly kelompokPengawasanService: KelompokPengawasanService) { }

  @Post()
  create(@Body() createKelompokPengawasanDto: CreateKelompokPengawasanDto, @Req() req: any) {
    return this.kelompokPengawasanService.create({
      ...createKelompokPengawasanDto,
      createdBy: req.user.id.toString(),
    });
  }

  @Get()
  findAll(
    page?: number,
    perPage?: number,
    search?: string,
    orderBy?: string,
    order?: string,
  ) {
    return this.kelompokPengawasanService.findAll(
      Number(page) || 1,
      Number(perPage) || 10,
      search,
      orderBy,
      order

    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kelompokPengawasanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKelompokPengawasanDto: UpdateKelompokPengawasanDto, @Req() req: any) {
    return this.kelompokPengawasanService.update(+id, {
      ...updateKelompokPengawasanDto,
      updatedBy: req.user.id.toString(),
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kelompokPengawasanService.remove(+id);
  }
}
