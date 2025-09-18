import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JenisPenugasanService } from './jenis-penugasan.service';
import { CreateJenisPenugasanDto } from './dto/create-jenis-penugasan.dto';
import { UpdateJenisPenugasanDto } from './dto/update-jenis-penugasan.dto';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
@UseGuards(JwtAuthGuard, PermissionGuard) // default semua endpoint cek JWT + permission
@Controller('jenis-penugasan')
export class JenisPenugasanController {
  constructor(private readonly jenisPenugasanService: JenisPenugasanService) {}

  @Post()
  create(
    @Body() createJenisPenugasanDto: CreateJenisPenugasanDto,
    @Req() req: any,
  ) {
    console.log(req.user);
    return this.jenisPenugasanService.create({
      ...createJenisPenugasanDto,
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
    return this.jenisPenugasanService.findAll(
      Number(page) || 1,
      Number(perPage) || 10,
      search,
      orderBy,
      order,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jenisPenugasanService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJenisPenugasanDto: UpdateJenisPenugasanDto,
  ) {
    return this.jenisPenugasanService.update(+id, updateJenisPenugasanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jenisPenugasanService.remove(+id);
  }
}
