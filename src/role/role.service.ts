import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { errorResponse, successResponse } from 'src/utils/response.util';
import { createroleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async findAll(pages: number, perPage: number, search?: string) {
    const skip = (pages - 1) * perPage;

    const where: any = {};
    if (search) {
      where.OR = [{ name: { contains: search } }];
    }

    const [roles, total] = await this.prisma.$transaction([
      this.prisma.role.findMany({
        where,
        skip,
        take: perPage,
        include: {
          RolePermission: {
            include: {
              permission: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.role.count({ where }),
    ]);

    // Format ulang supaya lebih clean
    const data = roles.map((role) => ({
      id: role.id,
      name: role.name,
      createdAt: role.createdAt,
      permissions: role.RolePermission.map((rp) => rp.permission),
    }));

    return successResponse('Berhasil mendapatkan role', {
      data: data,
      total,
      pages,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  }

  async find(id: number) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: {
        RolePermission: {
          include: { role: true, permission: true },
        },
        users: {
          include: {
            user: {
              include: {
                Biodata: true,
              },
            },
          },
        },
      },
    });

    if (!role) {
      throw new BadRequestException(
        errorResponse(
          `Role dengan ID ${id} tidak ditemukan`,
          'ROLE_NOT_FOUND',
          404,
        ),
      );
    }

    const data = {
      id: role.id,
      name: role.name,
      users: role.users.map((u) => ({
        id_user: u.user.id,
        email: u.user.email,
        biodata: u.user.Biodata,
      })),
      permission: role.RolePermission.map((rp) => rp.permission),
    };

    return successResponse('Role ditemukan', data);
  }

  async create({ name, permissions }: createroleDto) {
    // Validasi apakah peran sudah ada
    const exists = await this.prisma.role.findUnique({
      where: { name },
    });

    if (exists) {
      throw new NotFoundException(
        errorResponse(`Peran ${name} sudah ada`, 'ROLE_EXISTS', 400),
      );
    }

    // Validasi apakah semua ID izin valid
    if (permissions && permissions.length > 0) {
      const validPermissions = await this.prisma.permission.findMany({
        where: { id: { in: permissions } },
        select: { id: true },
      });

      if (validPermissions.length !== permissions.length) {
        throw new NotFoundException(
          errorResponse(
            'Satu atau lebih ID izin tidak valid  ',
            'INVALID_PERMISSIONS',
            400,
          ),
        );
      }
    }

    // Gunakan transaksi untuk membuat peran dan hubungan RolePermission
    const role = await this.prisma.$transaction(async (prisma) => {
      // Buat peran
      const createdRole = await prisma.role.create({
        data: { name },
      });

      // Buat hubungan RolePermission jika ada permissions
      if (permissions && permissions.length > 0) {
        await prisma.rolePermission.createMany({
          data: permissions.map((permissionId) => ({
            id_role: createdRole.id,
            id_permission: permissionId,
          })),
        });
      }

      // Ambil peran dengan izin terkait untuk respons
      return prisma.role.findUnique({
        where: { id: createdRole.id },
        include: {
          RolePermission: {
            select: {
              id_permission: true,
            },
          },
        },
      });
    });

    // Format respons
    const responseData = {
      id: role?.id || null,
      name: role?.name,
      createdAt: role?.createdAt,
      permissions: role?.RolePermission.map((rp) => rp.id_permission),
    };

    return successResponse('Peran berhasil dibuat', responseData);
  }

  async update(id: number, data: UpdateRoleDto) {
    const { name, permissions } = data;

    // Cek apakah role dengan ID yang diberikan ada
    const existingRole = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!existingRole) {
      throw new BadRequestException(`Role dengan ID ${id} tidak ditemukan`);
    }

    // Jika nama berubah, periksa apakah nama baru sudah digunakan oleh role lain
    if (name && name !== existingRole.name) {
      const duplicateRole = await this.prisma.role.findUnique({
        where: { name },
      });

      if (duplicateRole && duplicateRole.id !== id) {
        throw new BadRequestException(`Nama role '${name}' sudah digunakan`);
      }
    }

    // Validasi permissions jika dikirim
    if (permissions && permissions.length > 0) {
      const validPermissions = await this.prisma.permission.findMany({
        where: { id: { in: permissions } },
        select: { id: true },
      });

      if (validPermissions.length !== permissions.length) {
        throw new BadRequestException('Satu atau lebih ID izin tidak valid');
      }
    }

    // Lakukan transaksi update
    const updatedRole = await this.prisma.$transaction(async (prisma) => {
      // Update nama role
      const updated = await prisma.role.update({
        where: { id },
        data: { name },
      });

      // Jika ada permissions, update relasi RolePermission
      if (permissions) {
        // Hapus semua permission lama
        await prisma.rolePermission.deleteMany({
          where: { id_role: id },
        });

        // Tambahkan permissions baru
        if (permissions.length > 0) {
          await prisma.rolePermission.createMany({
            data: permissions.map((permissionId) => ({
              id_role: id,
              id_permission: permissionId,
            })),
          });
        }
      }

      // Ambil data role yang sudah diupdate
      return prisma.role.findUnique({
        where: { id },
        include: {
          RolePermission: {
            select: { id_permission: true },
          },
        },
      });
    });

    const responseData = {
      id: updatedRole?.id,
      name: updatedRole?.name,
      updatedAt: updatedRole?.updatedAt,
      permissions: updatedRole?.RolePermission.map((rp) => rp.id_permission),
    };

    return successResponse('Role berhasil diperbarui', responseData);
  }

  async delete(id: number) {
    const findId = await this.prisma.role.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(`Role dengan ID ${id} tidak ditemukan`);
    }
    const deleted = await this.prisma.role.delete({
      where: { id },
    });
    return successResponse('Role berhasil dihapus', deleted);
  }
}
