import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { successResponse } from 'src/utils/response.util';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // ================= CREATE USER =================
  async createUser(data: CreateUserDto) {
    const existingEmail = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existingEmail) throw new BadRequestException('Email sudah digunakan');

    const existingUsername = await this.prisma.user.findUnique({ where: { username: data.username } });
    if (existingUsername) throw new BadRequestException('Username sudah digunakan');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        username: data.username,
        password: hashedPassword,
        UserRole: {
          create: data.roles.map((id_role) => ({ id_role })),
        },
        Biodata: data.biodata
          ? {
              create: data.biodata,
            }
          : undefined,
      },
      include: {
        UserRole: { include: { role: true } },
        Biodata: true,
      },
    });

    return successResponse('User berhasil dibuat', {
      ...user,
      roles: user.UserRole.map((ur) => ur.role.name),
    });
  }

  // ================= GET USER BY ID =================
  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        UserRole: { include: { role: { include: { RolePermission: { include: { permission: true } } } } } },
        Biodata: true,
      },
    });

    if (!user) throw new BadRequestException(`User dengan Id ${id} tidak ditemukan`);

    const roles = user.UserRole.map((ur) => ({ id: ur.role.id, name: ur.role.name }));
    const permissions = [
      ...new Set(
        user.UserRole.flatMap((ur) => ur.role.RolePermission).map((rp) => rp.permission.name),
      ),
    ];

    return successResponse('Data ditemukan', {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      roles,
      permissions,
      biodata: user.Biodata,
    });
  }

  // ================= GET USER BY USERNAME =================
  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        UserRole: { include: { role: { include: { RolePermission: { include: { permission: true } } } } } },
        Biodata: true,
      },
    });

    if (!user) throw new BadRequestException(`User dengan username ${username} tidak ditemukan`);

    const roles = user.UserRole.map((ur) => ({ id: ur.role.id, name: ur.role.name }));
    const permissions = [
      ...new Set(
        user.UserRole.flatMap((ur) => ur.role.RolePermission).map((rp) => rp.permission.name),
      ),
    ];

    return successResponse('Data ditemukan', {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      roles,
      permissions,
      biodata: user.Biodata,
    });
  }

  // ================= GET ALL USERS =================
  async findAll(page = 1, perPage = 10, search?: string) {
    const skip = (page - 1) * perPage;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { username: { contains: search } },
      ];
    }

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip,
        take: perPage,
        include: {
          UserRole: { include: { role: { include: { RolePermission: { include: { permission: true } } } } } },
          Biodata: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    const data = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      username: u.username,
      biodata: u.Biodata,
      roles: [...new Set(u.UserRole.map((ur) => ur.role.name))],
      permissions: [
        ...new Set(u.UserRole.flatMap((ur) => ur.role.RolePermission).map((rp) => rp.permission.name)),
      ],
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    }));

    return successResponse('Berhasil mendapatkan user', {
      data,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  }

  // ================= UPDATE USER =================
  async update(id: number, data: updateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new BadRequestException(`User dengan Id ${id} tidak ditemukan`);

    if (data.email) {
      const emailExists = await this.prisma.user.findUnique({ where: { email: data.email } });
      if (emailExists && emailExists.id !== id) throw new BadRequestException(`Email ${data.email} sudah digunakan`);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password ? await bcrypt.hash(data.password, 10) : undefined,
      },
    });

    if (data.roles?.length) {
      await this.prisma.userRole.deleteMany({ where: { id_user: id } });
      await this.prisma.userRole.createMany({
        data: data.roles.map((id_role) => ({ id_user: id, id_role })),
      });
    }

    return successResponse('User berhasil diperbaharui', updatedUser);
  }

  // ================= DELETE USER =================
  async destroy(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    const nama = user?.name ;
    if (!user) throw new BadRequestException(`User dengan Id ${id} tidak ditemukan`);

    await this.prisma.user.delete({ where: { id } });
    return successResponse('User berhasil dihapus',nama);
  }
}
