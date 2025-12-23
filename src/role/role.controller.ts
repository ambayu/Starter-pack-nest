import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleService } from './role.service';
import { createroleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { Permissions } from 'src/common/decorators/permission.decorator';

@UseGuards(JwtAuthGuard, PermissionGuard) // default semua endpoint cek JWT + permission

@Controller('role')
export class RoleController {
    constructor(
        private readonly prisma: PrismaService,
        private readonly roleService: RoleService
    ) { }


    @Get()
    @Permissions('role:view')
    findAll(
        @Query('page') page: number = 1,
        @Query('perPage') perPage: number = 10,
        @Query('search') search?: string

    ) {
        return this.roleService.findAll(
            page,
            perPage,
            search
        )
    }

    @Get(':id')
    @Permissions('role:view')
    find(@Param('id') id: number) {
        return this.roleService.find(id)
    }

    @Post()
    @Permissions('role:create')
    create(@Body() body: createroleDto) {
        return this.roleService.create(body);
    }

    @Patch(':id')
    @Permissions('role:edit')
    update(@Param('id') id: number, @Body() data: UpdateRoleDto) {
        return this.roleService.update(id, data);
    }
    @Delete(':id')
    @Permissions('role:delete')
    delete(@Param('id') id: number) {
        return this.roleService.delete(id);
    }


}
