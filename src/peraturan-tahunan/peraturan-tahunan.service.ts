import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePeraturanTahunanDto } from './dto/create-peraturan-tahunan.dto';
import { UpdatePeraturanTahunanDto } from './dto/update-peraturan-tahunan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class PeraturanTahunanService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreatePeraturanTahunanDto) {
    const q = await this.prisma.peraturan_Tahunan.create({
      data: {
        tahun: data.tahun,
        peraturan: data.peraturan,
      },
    });

    return successResponse('Peraturan tahunan berhasil dibuat', q);
  }

  async findAll(page = 1, perPage = 10, tahun?: string, peraturan?: string) {
    const skip = (page - 1) * perPage;

    // Buat filter dinamis berdasarkan input tahun & peraturan
    const where: any = {};

    if (tahun) {
      where.tahun = {
        contains: tahun,
        mode: 'insensitive', // ignore huruf besar-kecil
      };
    }

    if (peraturan) {
      where.nama = {
        contains: peraturan,
        mode: 'insensitive',
      };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.peraturan_Tahunan.findMany({
        skip,
        take: perPage,
        where,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.peraturan_Tahunan.count({ where }),
    ]);

    return successResponse('Berhasil mendapatkan peraturan tahunan', {
      data,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  }

  findOne(id: number) {
    const q = this.prisma.peraturan_Tahunan.findUnique({
      where: { id },
    });
    if (!q) {
      throw new BadRequestException(
        `Peraturan tahunan dengan ID ${id} tidak ditemukan`,
      );
    }
    return successResponse(
      `Berhasil mendapatkan peraturan tahunan dengan ID ${id}`,
      q,
    );
  }

  async update(id: number, data: UpdatePeraturanTahunanDto) {
    const findId = await this.prisma.peraturan_Tahunan.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        `Peraturan tahunan dengan ID ${id} tidak ditemukan`,
      );
    }

    const q = await this.prisma.peraturan_Tahunan.update({
      where: { id },
      data: {
        tahun: data.tahun,
        peraturan: data.peraturan,
      },
    });

    return successResponse(
      `Berhasil memperbarui peraturan tahunan dengan ID ${id}`,
      q,
    );
  }

  async remove(id: number) {
    const finId = await this.prisma.peraturan_Tahunan.findUnique({
      where: { id },
    });
    if (!finId) {
      throw new BadRequestException(
        `Peraturan tahunan dengan ID ${id} tidak ditemukan`,
      );
    }

    const q = await this.prisma.peraturan_Tahunan.delete({
      where: { id },
    });

    return successResponse(
      `Berhasil menghapus peraturan tahunan dengan ID ${id}`,
      q,
    );
  }
}
