import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  // ================= CREATE USER =================
  async createUser(data: CreateUserDto) {
    // Cek email
    const findEmail = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (findEmail) throw new BadRequestException('Email sudah digunakan');

    // Cek username
    const findUsername = await this.prisma.user.findUnique({
      where: { username: data.username },
    });
    if (findUsername) throw new BadRequestException('Username sudah digunakan');

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Buat user + relasi role
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        username: data.username,
        password: hashedPassword,
        UserRole: {
          create: data.roles.map((id_role) => ({ id_role })),
        },
      },
      include: {
        UserRole: {
          include: {
            role: true,
          },
        },
      },
    });

    return successResponse('User berhasil dibuat', {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.UserRole.map((ur) => ur.role.name),
      createdAt: user.createdAt,
    });
  }

  // ================= GET USER BY ID =================
  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        UserRole: {
          include: {
            role: {
              include: {
                RolePermission: { include: { permission: true } },
              },
            },
          },
        },
        Biodata: true,
      },
    });

    if (!user) throw new BadRequestException(`User dengan Id ${id} tidak ditemukan`);

    // Roles dengan id dan name
    const roles = user.UserRole.map((ur) => ({
      id: ur.role.id,
      name: ur.role.name,
    }));

    const permissions = user.UserRole
      .flatMap((ur) => ur.role.RolePermission)
      .map((rp) => rp.permission.name);
    const uniquePermissions = [...new Set(permissions)];

    return successResponse('Data ditemukan', {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      roles, // sekarang berupa array {id, name}
      permissions: uniquePermissions,
      biodata: user.Biodata,
    });
  }


  // ================= GET ALL USERS =================
  async findAll(pages = 1, perPage = 10, search?: string) {
    const skip = (pages - 1) * perPage;

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

    const data = users.map((user) => {
      const roles = user.UserRole.map((ur) => ur.role.name);
      const permissions = user.UserRole.flatMap((ur) => ur.role.RolePermission).map((rp) => rp.permission.name);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        biodata: user.Biodata,
        roles: [...new Set(roles)],
        permissions: [...new Set(permissions)],
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });

    return successResponse('Berhasil mendapatkan user', {
      data,
      total,
      pages,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  }

  // ================= UPDATE USER =================
  async update(id: number, data: updateUserDto) {
    // Cari user
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new BadRequestException(`User dengan Id ${id} tidak ditemukan`);

    // Cek email unik
    if (data.email) {
      const findEmail = await this.prisma.user.findUnique({ where: { email: data.email } });
      if (findEmail && findEmail.id !== id) {
        throw new BadRequestException(`Email ${data.email} sudah digunakan`);
      }
    }

    // Update user + optional hash password
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password ? await bcrypt.hash(data.password, 10) : undefined,
      },
    });

    // Update roles jika ada
    if (data.roles && data.roles.length > 0) {
      // Hapus relasi lama
      await this.prisma.userRole.deleteMany({ where: { id_user: id } });

      // Ambil role yang valid dari database
      const existingRoles = await this.prisma.role.findMany({
        where: { id: { in: data.roles } },
        select: { id: true },
      });

      const validRoleIds = existingRoles.map(r => r.id);

      // Tambahkan relasi baru hanya untuk role valid
      if (validRoleIds.length > 0) {
        await this.prisma.userRole.createMany({
          data: validRoleIds.map((id_role) => ({ id_user: id, id_role })),
        });
      }
    }

    // Kembalikan response sukses
    return successResponse('User berhasil diperbaharui', {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      username: updatedUser.username,
    });
  }


  // ================= DELETE USER =================
  async destroy(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new BadRequestException(`User dengan Id ${id} tidak ditemukan`);

    const deleted = await this.prisma.user.delete({ where: { id } });
    return successResponse('User berhasil dihapus', deleted);
  }
}
