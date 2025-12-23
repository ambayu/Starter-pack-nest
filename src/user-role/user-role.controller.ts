import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { Permissions } from 'src/common/decorators/permission.decorator';

@Controller('user-role')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) { }

  @Post()
  @Permissions('user-role:create')
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleService.create(createUserRoleDto);
  }

  @Get()
  @Permissions('user-role:view')
  findAll() {
    return this.userRoleService.findAll();
  }

  @Get(':id')
  @Permissions('user-role:view')
  findOne(@Param('id') id: string) {
    return this.userRoleService.findOne(+id);
  }

  @Patch(':id')
  @Permissions('user-role:edit')
  update(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.userRoleService.update(+id, updateUserRoleDto);
  }

  @Delete(':id')
  @Permissions('user-role:delete')
  remove(@Param('id') id: string) {
    return this.userRoleService.remove(+id);
  }
}
