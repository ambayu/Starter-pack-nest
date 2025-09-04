import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateBiodataDto } from 'src/biodata/dto/update-biodata.dto';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Permissions } from 'src/common/decorators/permission.decorator';

@Controller('user')
@UseGuards(JwtAuthGuard, PermissionGuard) // default semua endpoint cek JWT + permission
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) { }

  @Get()
  @Permissions('user:view')
  findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('search') search?: string,
  ) {
    return this.userService.findAll(
      Number(page) || 1,
      Number(perPage) || 10,
      search,
    );
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  updated(@Param('id') id: number, @Body() data: updateBiodataDto) {
    return this.userService.update(Number(id), data);
  }

  @Post()
  async create(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.createUser(CreateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.destroy(Number(id));
  }
}
