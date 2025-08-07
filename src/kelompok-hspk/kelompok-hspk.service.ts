import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';
import { CreateKelompokHspkDto } from './dto/create-kelompok-hspk.dto';
import { UpdateKelompokHspkDto } from './dto/update-kelompok-hspk.dto';

@Injectable()
export class KelompokHspkService {
  constructor(private prisma: PrismaService) { }
  async create(data: CreateKelompokHspkDto) {
    const findkode = await this.prisma.kelompok_HSPK.findFirst({ where: { kode: data.kode } });
    if (findkode) {
      throw new BadRequestException('Kelompok HSPK ini dengan kode ' + data.kode + ' sudah ada');
    }

    const q = await this.prisma.kelompok_HSPK.create({ data });
    return successResponse('Kelompok HSPK berhasil dibuat', q);
  }

  async findAll(
    page = 1,
    perPage = 10,
    search?: string
  ) {
    const skip = (page - 1) * perPage;

    const where: any = {};
    if (search) {
      where.OR = [
        { kode: { contains: search } },
        { uraian: { contains: search } },
      ];
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.kelompok_HSPK.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.kelompok_HSPK.count({ where }),
    ]);

    return successResponse('Berhasil mendapatkan kelompok asb', {
      data,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  }

  async findOne(id: number) {
    const findId = await this.prisma.kelompok_HSPK.findUnique({
      where: { id },
    })
    if (!findId) {
      throw new BadRequestException(
        `Kelompok HSPK dengan ID ${id} tidak ditemukan`,
      );
    }
    return successResponse(
      `Berhasil mendapatkan kelompok HSPK dengan ID ${id}`,
      findId,
    );
  }

  async update(id: number, data: UpdateKelompokHspkDto) {
    const findId = await this.prisma.kelompok_HSPK.findUnique({
      where: { id },
    })
    if (!findId) {
      throw new BadRequestException(
        `Kelompok HSPK dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.kelompok_HSPK.update({
      where: { id },
      data: {
        kode: data.kode,
        uraian: data.uraian,
      },
    });
    return successResponse(
      `Berhasil memperbarui kelompok HSPK dengan ID ${id}`,
      q,
    );
  }

  async remove(id: number) {
    const findId = await this.prisma.kelompok_HSPK.findUnique({
      where: { id },
    })
    if (!findId) {
      throw new BadRequestException(
        'Kelompok HSPK dengan Id ' + id + ' tidak ditemukan',
      );
    }
    const q = await this.prisma.kelompok_HSPK.delete({
      where: { id },
    })
    return successResponse('Kelompok HSPK berhasil dihapus', q);

  }
}
