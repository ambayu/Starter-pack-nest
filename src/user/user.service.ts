import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { updateBiodataDto } from 'src/biodata/dto/update-biodata.dto';
import { updateUserDto } from './dto/update-user.dto';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async createUser(data: CreateUserDto) {
    const findmail = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (findmail) {
      throw new BadRequestException('Email sudah digunakan');
    }

    const findUsername = await this.prisma.user.findUnique({
      where: { username: data.username },
    });

    if (findUsername) {
      throw new BadRequestException('Username sudah digunakan');
    }

    // hash password

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        username: data.username,
      },
    });

    return {
      statusCode: 201,
      status: 'success',
      message: 'User berhasil dibuat',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt, // pastikan field ini ada di model
      },
    };
  }

  async findById(id: number) {
    const q = await this.prisma.user.findUnique({
      where: { id },
      include: {
        UserRole: {
          include: {
            role: {
              include: {
                RolePermission: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
        Biodata: true,
      },
    });

    if (!q) {
      throw new BadRequestException(
        'User dengan Id ' + id + ' tidak ditemukan',
      );
    }

    const roles = q.UserRole.map((ur) => ur.role.name);
    const permissions = q.UserRole.flatMap((ur) => ur.role.RolePermission).map(
      (rp) => rp.permission.name,
    );
    const uniquePermissions = [...new Set(permissions)];

    return successResponse('Data ditemukan', {
      id: q.id,
      name: q.name,
      email: q.email,
      roles,
      permissions: uniquePermissions,
    });
  }

  async findAll(pages: number = 1, perPage: number = 10, search?: string) {
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
          UserRole: {
            include: {
              role: {
                include: {
                  RolePermission: {
                    include: {
                      permission: true,
                    },
                  },
                },
              },
            },
          },
          Biodata: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    const data = users.map((user) => {
      const roles = user.UserRole.map((ur) => ur.role.name);
      const permissions = user.UserRole.flatMap(
        (ur) => ur.role.RolePermission,
      ).map((rp) => rp.permission.name);

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

  async update(id: number, data: updateUserDto) {
    const findId = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!findId) {
      throw new BadRequestException(
        'User dengan Id ' + id + ' Tidak Ditemukan',
      );
    }

    if (data.email) {
      const findIdEmail = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      // cek apakah email sudah dipakai user lain
      if (findIdEmail && findIdEmail.id !== id) {
        throw new BadRequestException(
          'User dengan Email ' + data.email + ' sudah ada',
        );
      }
    }

    const q = await this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password
          ? await bcrypt.hash(data.password, 10)
          : undefined,
      },
    });

    return successResponse('User berhasil diperbaharui', q);
  }

  async destroy(id: number) {
    const findId = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!findId) {
      throw new BadRequestException(
        'User dengan Id ' + id + ' tidak ditemukan',
      );
    }

    const q = await this.prisma.user.delete({
      where: { id },
    });
    return successResponse('User Berhasil Dihapus', q);
  }
}
