import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSatuanDto } from './dto/create-satuan.dto';
import { UpdateSatuanDto } from './dto/update-satuan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class SatuanService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateSatuanDto) {
    const q = await this.prisma.satuan.create({
      data: {
        nama: data.nama,
      },
    });

    return successResponse('Satuan berhasil dibuat', q);
  }

  async findAll(page = 1, perPage = 10, search?: string) {
    const skip = (page - 1) * perPage;
    const where: any = {};
    where.deletedAt = null; // Pastikan hanya mengambil data yang tidak dihapus
    if (search) {
      where.nama = {
        contains: search,
        
      };
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.satuan.findMany({
        skip,
        take: perPage,
        where,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.satuan.count({ where }),
    ]);
    return successResponse('Berhasil mendapatkan satuan', {
      data,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  }

  async findOne(id: number) {
    const findId = await this.prisma.satuan.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(`Satuan dengan ID ${id} tidak ditemukan`);
    }

    const q = this.prisma.satuan.findUnique({
      where: { id, deletedAt: null },
    });
    return successResponse(`Berhasil mendapatkan satuan dengan ID ${id}`, q);
  }

  async update(id: number, data: UpdateSatuanDto) {
    const findId = await this.prisma.satuan.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException(`Satuan dengan ID ${id} tidak ditemukan`);
    }

    const q = await this.prisma.satuan.update({
      where: { id, deletedAt: null },
      data: {
        nama: data.nama,
      },
    });

    return successResponse(`Berhasil memperbarui satuan dengan ID ${id}`, q);
  }

  async remove(id: number) {
    const findId = await this.prisma.satuan.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException(`Satuan dengan ID ${id} tidak ditemukan`);
    }
    const q = await this.prisma.satuan.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });
    return successResponse(`Berhasil menghapus satuan dengan ID ${id}`, q);
  }
}
