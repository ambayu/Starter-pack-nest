import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { OpdService } from './opd.service';
import { CreateOpdDto } from './dto/create-opd.dto';
import { UpdateOpdDto } from './dto/update-opd.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/guard/permission.guard';

@UseGuards(JwtAuthGuard, PermissionGuard) // default semua endpoint cek JWT + permission
@Controller('opd')
export class OpdController {
  constructor(private readonly opdService: OpdService) { }

  @Post()
  create(@Body() createOpdDto: CreateOpdDto, @Req() req: any) {
    return this.opdService.create({
      ...createOpdDto,
      createdBy: Number(req.user.id), // kalau mau simpan siapa yang buat
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
    return this.opdService.findAll(
      Number(page) || 1,
      Number(perPage) || 10,
      search,
      order ?? 'desc',
      orderBy ?? 'created_at',
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opdService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpdDto: UpdateOpdDto, @Req() req: any) {
    return this.opdService.update(+id, {
      ...updateOpdDto,
     updatedBy: Number(req.user.id), // kalau mau catat siapa yg update
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opdService.delete(+id);
  }
}
