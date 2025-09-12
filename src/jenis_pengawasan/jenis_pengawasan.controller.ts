import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { JenisPengawasanService } from './jenis_pengawasan.service';
import { CreateJenisPengawasanDto } from './dto/create-jenis_pengawasan.dto';
import { UpdateJenisPengawasanDto } from './dto/update-jenis_pengawasan.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/guard/permission.guard';

@UseGuards(JwtAuthGuard, PermissionGuard) // default semua endpoint cek JWT + permission
@Controller('jenis-pengawasan')
export class JenisPengawasanController {
  constructor(private readonly jenisPengawasanService: JenisPengawasanService) { }

  @Post()
  create(
    @Body() createJenisPengawasanDto: CreateJenisPengawasanDto,
    @Req() req: any
  ) {
    return this.jenisPengawasanService.create({
      ...createJenisPengawasanDto,
      createdBy: req.user.id.toString(),
    });
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('search') search?: string,
    @Query('orderBy') orderBy?: string,
    @Query('order') order?: string,

  ) {
    return this.jenisPengawasanService.findAll(
      Number(page) || 1,
      Number(perPage) || 10,
      search,
      orderBy,
      order,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string,) {
    return this.jenisPengawasanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Req() req: any, @Body() updateJenisPengawasanDto: UpdateJenisPengawasanDto) {
    return this.jenisPengawasanService.update(+id,{
      ...updateJenisPengawasanDto,
      updatedBy: req.user.id.toString(),
    
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jenisPengawasanService.remove(+id);
  }
}
