import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubKegiatanAsbDto } from './dto/create-sub-kegiatan-asb.dto';
import { UpdateSubKegiatanAsbDto } from './dto/update-sub-kegiatan-asb.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class SubKegiatanAsbService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateSubKegiatanAsbDto) {

    const findIdKegiatan = await this.prisma.subKegiatan_ASB.findFirst({ where: { id_kegiatan_asb: data.id_kegiatan_asb } });
    if (findIdKegiatan) {
      const findKode = await this.prisma.subKegiatan_ASB.findFirst({ where: { kode: data.kode } });
      if (findKode) {
        throw new BadRequestException('Sub Kegiatan ASB ini dengan kode ' + data.kode + ' sudah ada');
      }
    }

    const q = await this.prisma.subKegiatan_ASB.create({
      data: {
        kode: data.kode,
        uraian: data.uraian,
        id_kegiatan_asb: data.id_kegiatan_asb,
      },
    });
    return successResponse('Sub Kegiatan ASB berhasil dibuat', q);
  }

  async findAll(page: number = 1, perPage: number = 10, $search?: string, id_kegiatan_asb?: number) {
    const skip = (page - 1) * perPage;
    const where: any = {};
    if ($search) {
      where.OR = [
        { kode: { contains: $search } },
        { uraian: { contains: $search } },
        {
          kegiatan_asb: {
            is: {
              kelompok_asb: {
                is: {
                  kode: {
                    contains: $search,
                  },
                },
              },
            },
          },
        }
      ];
    }
    if (id_kegiatan_asb) {
      where.id_kegiatan_asb = id_kegiatan_asb;
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.subKegiatan_ASB.findMany({
        where,
        skip,
        take: perPage,
        include: {
          kegiatan_asb: {
            include: {
              kelompok_asb: true,
            },
          }
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

  async update(id: number, data: UpdateSubKegiatanAsbDto) {
    const findId = await this.prisma.subKegiatan_ASB.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        'Sub Kegiatan ASB dengan Id ' + id + ' tidak ditemukan',
      );
    }

    const findIdKegiatan = await this.prisma.subKegiatan_ASB.findFirst({ where: { id_kegiatan_asb: data.id_kegiatan_asb } });
    if (findIdKegiatan) {
      const findKode = await this.prisma.subKegiatan_ASB.findFirst({ where: { kode: data.kode } });
      if (findKode) {
        throw new BadRequestException('Sub Kegiatan ASB ini dengan kode ' + data.kode + ' sudah ada');
      }
    }

    const q = await this.prisma.subKegiatan_ASB.update({
      where: { id },
      data: {
        kode: data.kode,
        uraian: data.uraian,
        id_kegiatan_asb: data.id_kegiatan_asb,
      },
    });
    return successResponse('Sub Kegiatan ASB berhasil diperbarui', q);
  }

  async remove(id: number) {
    const findId = await this.prisma.subKegiatan_ASB.findUnique({
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
