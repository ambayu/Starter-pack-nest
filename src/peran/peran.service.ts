import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePeranDto } from './dto/create-peran.dto';
import { UpdatePeranDto } from './dto/update-peran.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { response } from 'express';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class PeranService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreatePeranDto) {
    // Cari apakah nama peran ada, termasuk yang sudah soft delete
    const existing = await this.prisma.peran.findFirst({
      where: { nama: data.nama },
    });

    if (existing) {
      if (existing.deletedAt) {
        // Jika ada tapi sudah dihapus (deletedAt != null), restore
        const restored = await this.prisma.peran.update({
          where: { id: existing.id },
          data: { deletedAt: null },
        });
        return restored;
      } else {
        // Jika ada dan masih aktif, throw error
        throw new BadRequestException('Peran sudah dibuat');
      }
    }

    // Jika tidak ada, buat peran baru
    const created = await this.prisma.peran.create({
      data: { nama: data.nama },
    });

    return successResponse('Peran berhasil dibuat', created);
  }
  //iya

  async findAll(
    page: number,
    perPage: number,
    search?: string,
    orderBy?: string,
    order?: string,
  ) {
    const skip = (page - 1) * perPage;

    const where: any = {};
    where.deletedAt = null;
    if (search) {
      where.OR = [{ nama: { contains: search } }];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.peran.findMany({
        skip,
        take: perPage,
        orderBy: {
          [orderBy ? orderBy : 'createdAt']: order,
        },
      }),
      this.prisma.peran.count({ where }),
    ]);

    return successResponse('Peran ditemukan', {
      data,
      total,
      page,
      perPage,
    });
  }

  async findOne(id: number) {
    const findId = await this.prisma.peran.findUnique({
      where: { id, deletedAt: null },
    });

    if (!findId) {
      throw new BadRequestException(
        'Peran dengan Id ' + id + ' tidak ditemukan',
      );
    }

    return successResponse('Peran ditemukan', findId);
  }

  async update(id: number, data: UpdatePeranDto) {
    const findId = await this.prisma.peran.findUnique({
      where: { id, deletedAt: null },
    });

    if (!findId) {
      throw new BadRequestException(
        'Peran dengan Id ' + id + ' tidak ditemukan',
      );
    }

    const q = await this.prisma.peran.update({
      where: { id },
      data: {
        nama: data.nama,
      },
    });

    return successResponse('Peran berhasil di perbaharui', q);
  }

  async remove(id: number) {
    const findId = await this.prisma.peran.findUnique({
      where: { id },
    });

    if (!findId) {
      throw new BadRequestException(`Peran dengan Id ${id} tidak ditemukan`);
    }
    const q = await this.prisma.peran.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return successResponse('Peran berhasil dihapus', q);
  }
}
