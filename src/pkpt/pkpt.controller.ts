import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { PkptService } from './pkpt.service';
import { CreatePkptDto } from './dto/create-pkpt.dto';
import { UpdatePkptDto } from './dto/update-pkpt.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/guard/permission.guard';


@UseGuards(JwtAuthGuard, PermissionGuard) // default semua endpoint cek JWT + permission

@Controller('pkpt')
export class PkptController {
  constructor(private readonly pkptService: PkptService) { }

  @Post()
  create(@Body() createPkptDto: CreatePkptDto, @Req() req: any) {
    return this.pkptService.create({
      ...createPkptDto,
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
    return this.pkptService.findAll(
      Number(page) || 1,
      Number(perPage) || 10,
      search,
      orderBy,
      order ?? 'desc',

    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pkptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePkptDto: UpdatePkptDto, @Req() req: any) {
    return this.pkptService.update(+id, {
      ...updatePkptDto,
      updatedBy: req.user.id.toString(),
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pkptService.remove(+id);
  }
}
