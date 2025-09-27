import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { Permissions } from 'src/common/decorators/permission.decorator';
import { updateUserDto } from './dto/update-user.dto';

@Controller('user')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @Permissions('user:view')
  findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('search') search?: string,
  ) {
    return this.userService.findAll(Number(page) || 1, Number(perPage) || 10, search);
  }

  @Get(':id')
  @Permissions('user:view')
  findById(@Param('id') id: number) {
    return this.userService.findById(Number(id));
  }

  @Get('username/:username')
  @Permissions('user:view')
  findByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Post()
  @Permissions('user:create')
  create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Patch(':id')
  @Permissions('user:update')
  update(@Param('id') id: number, @Body() dto: updateUserDto) {
    return this.userService.update(Number(id), dto);
  }

  @Delete(':id')
  @Permissions('user:delete')
  remove(@Param('id') id: number) {
    return this.userService.destroy(Number(id));
  }
}
