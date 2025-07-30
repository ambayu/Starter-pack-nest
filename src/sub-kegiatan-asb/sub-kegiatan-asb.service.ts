import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubKegiatanAsbDto } from './dto/create-sub-kegiatan-asb.dto';
import { UpdateSubKegiatanAsbDto } from './dto/update-sub-kegiatan-asb.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class SubKegiatanAsbService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSubKegiatanAsbDto) {
    const q = await this.prisma.subKegiatan_ASB.create({
      data: {
        kode: data.kode,
        uraian: data.uraian,
        id_kegiatan_asb: data.id_kegiatan_asb,
      },
    });
    return successResponse('Sub Kegiatan ASB berhasil dibuat', q);
  }

  async findAll(page: number = 1, perPage: number = 10, $search?: string) {
    const skip = (page - 1) * perPage;
    const where: any = {};
    if ($search) {
      where.OR = [
        { kode: { contains: $search } },
        { uraian: { contains: $search } },
      ];
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.subKegiatan_ASB.findMany({
        where,
        skip,
        take: perPage,
        include: {
          kegiatan_asb: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.subKegiatan_ASB.count({ where }),
    ]);

    return successResponse('Berhasil mendapatkan sub kegiatan asb', {
      data,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  }

  async findOne(id: number) {
    const findId = await this.prisma.subKegiatan_ASB.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        'Sub Kegiatan ASB dengan Id ' + id + ' tidak ditemukan',
      );
    }
    const q = await this.prisma.subKegiatan_ASB.findUnique({
      where: { id },
      include: {
        kegiatan_asb: true,
      },
    });
    return successResponse('Berhasil mendapatkan sub kegiatan asb', q);
  }

  update(id: number, data: UpdateSubKegiatanAsbDto) {
    const findId = this.prisma.subKegiatan_ASB.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        'Sub Kegiatan ASB dengan Id ' + id + ' tidak ditemukan',
      );
    }
    const q = this.prisma.subKegiatan_ASB.update({
      where: { id },
      data: {
        kode: data.kode,
        uraian: data.uraian,
        id_kegiatan_asb: data.id_kegiatan_asb,
      },
    });
    return successResponse('Sub Kegiatan ASB berhasil diperbarui', q);
  }

  remove(id: number) {
    const findId = this.prisma.subKegiatan_ASB.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        'Sub Kegiatan ASB dengan Id ' + id + ' tidak ditemukan',
      );
    }
    const q = this.prisma.subKegiatan_ASB.delete({
      where: { id },
    });
    return successResponse('Sub Kegiatan ASB berhasil dihapus', q);
  }
}
