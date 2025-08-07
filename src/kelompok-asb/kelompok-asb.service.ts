import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKelompokAsbDto } from './dto/create-kelompok-asb.dto';
import { UpdateKelompokAsbDto } from './dto/update-kelompok-asb.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class KelompokAsbService {
  constructor(private prisma: PrismaService) { }
  async create(data: CreateKelompokAsbDto) {
    const findkode = await this.prisma.kelompok_ASB.findFirst({ where: { kode: data.kode } });
    if (findkode) {
      throw new BadRequestException('Kelompok ASB ini dengan kode ' + data.kode + ' sudah ada');
    }

    const q = await this.prisma.kelompok_ASB.create({ data });
    return successResponse('Kelompok ASB berhasil dibuat', q);
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
      this.prisma.kelompok_ASB.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.kelompok_ASB.count({ where }),
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
    const findId = await this.prisma.kelompok_ASB.findUnique({
      where: { id },
    })
    if (!findId) {
      throw new BadRequestException(
        `Kelompok ASB dengan ID ${id} tidak ditemukan`,
      );
    }
    return successResponse(
      `Berhasil mendapatkan kelompok ASB dengan ID ${id}`,
      findId,
    );
  }

  async update(id: number, data: UpdateKelompokAsbDto) {
    const findId = await this.prisma.kelompok_ASB.findUnique({
      where: { id },
    })
    if (!findId) {
      throw new BadRequestException(
        `Kelompok ASB dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.kelompok_ASB.update({
      where: { id },
      data: {
        kode: data.kode,
        uraian: data.uraian,
      },
    });
    return successResponse(
      `Berhasil memperbarui kelompok ASB dengan ID ${id}`,
      q,
    );
  }

  async remove(id: number) {
    const findId = await this.prisma.kelompok_ASB.findUnique({
      where: { id },
    })
    if (!findId) {
      throw new BadRequestException(
        'Kelompok ASB dengan Id ' + id + ' tidak ditemukan',
      );
    }
    const q = await this.prisma.kelompok_ASB.delete({
      where: { id },
    })
    return successResponse('Kelompok ASB berhasil dihapus', q);

  }
}
