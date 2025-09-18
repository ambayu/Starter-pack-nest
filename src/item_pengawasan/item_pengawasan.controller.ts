import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ItemPengawasanService } from './item_pengawasan.service';
import { CreateItemPengawasanDto } from './dto/create-item_pengawasan.dto';
import { UpdateItemPengawasanDto } from './dto/update-item_pengawasan.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/guard/permission.guard';

@UseGuards(JwtAuthGuard, PermissionGuard) // default semua endpoint cek JWT + permission
@Controller('item-pengawasan')
export class ItemPengawasanController {
  constructor(private readonly itemPengawasanService: ItemPengawasanService) { }

  @Post()
  create(@Body() createItemPengawasanDto: CreateItemPengawasanDto, @Req() req: any) {
    return this.itemPengawasanService.create({
      ...createItemPengawasanDto,
      createdBy: Number(req.user.id),
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
    return this.itemPengawasanService.findAll(
      Number(page) || 1,
      Number(perPage) || 10,
      search,
      orderBy,
      order,

    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemPengawasanService.findOne(+id);
  }

  @Get('/kelompok-pengawasan/:id')
  findByKelompokPengawasan(@Param('id') id: string) {
    return this.itemPengawasanService.findByKelompokPengawasan(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemPengawasanDto: UpdateItemPengawasanDto, @Req() req: any) {
    return this.itemPengawasanService.update(+id, {
      ...updateItemPengawasanDto,
     updatedBy: Number(req.user.id),
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemPengawasanService.remove(+id);
  }
}
