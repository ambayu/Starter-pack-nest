import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubKegiatanHspkDto } from './dto/create-sub-kegiatan-hspk.dto';
import { UpdateSubKegiatanHspkDto } from './dto/update-sub-kegiatan-hspk.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class SubKegiatanHspkService {

  constructor(private prisma: PrismaService) { }

  async create(data: CreateSubKegiatanHspkDto) {

    const findIdKegiatan = await this.prisma.subKegiatan_HSPK.findFirst({
      where:
        { id_kegiatan_HSPK: data.id_kegiatan_HSPK }
    });

    if (findIdKegiatan) {
      const findKode = await this.prisma.subKegiatan_HSPK.findFirst({ where: { kode: data.kode } });
      if (findKode) {
        throw new BadRequestException('Sub Kegiatan HSPK ini dengan kode ' + data.kode + ' sudah ada');
      }
    }

    const q = await this.prisma.subKegiatan_HSPK.create({
      data: {
        kode: data.kode,
        uraian: data.uraian,
        id_kegiatan_HSPK: data.id_kegiatan_HSPK,
      },
    });
    return successResponse('Sub Kegiatan HSPK berhasil dibuat', q);
  }

  async findAll(page: number = 1, perPage: number = 10, $search?: string,) {
    const skip = (page - 1) * perPage;
    const where: any = {};
    if ($search) {
      where.OR = [
        { kode: { contains: $search } },
        { uraian: { contains: $search } },
        {
          kegiatan_Hid_kegiatan_HSPK: {
            is: {
              kelompok_Hid_kegiatan_HSPK: {
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

    const [data, total] = await this.prisma.$transaction([
      this.prisma.subKegiatan_HSPK.findMany({
        where,
        skip,
        take: perPage,
        include: {
          kegiatan_HSPK: {
            include: {
              kelompok_HSPK: true,
            },
          }
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.subKegiatan_HSPK.count({ where }),
    ]);

    return successResponse('Berhasil mendapatkan sub kegiatan Hid_kegiatan_HSPK', {
      data,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  }

  async findOne(id: number) {
    const findId = await this.prisma.subKegiatan_HSPK.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        'Sub Kegiatan HSPK dengan Id ' + id + ' tidak ditemukan',
      );
    }
    const q = await this.prisma.subKegiatan_HSPK.findUnique({
      where: { id },
      include: {
        kegiatan_HSPK: true,
      },
    });
    return successResponse('Berhasil mendapatkan sub kegiatan Hid_kegiatan_HSPK', q);
  }

  async update(id: number, data: UpdateSubKegiatanHspkDto) {
    const findId = await this.prisma.subKegiatan_HSPK.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        'Sub Kegiatan HSPK dengan Id ' + id + ' tidak ditemukan',
      );
    }

    const findIdKegiatan = await this.prisma.subKegiatan_HSPK.findFirst({ where: { id_kegiatan_HSPK: data.id_kegiatan_HSPK } });
    if (findIdKegiatan) {
      const findKode = await this.prisma.subKegiatan_HSPK.findFirst({ where: { kode: data.kode } });
      if (findKode) {
        throw new BadRequestException('Sub Kegiatan HSPK ini dengan kode ' + data.kode + ' sudah ada');
      }
    }

    const q = await this.prisma.subKegiatan_HSPK.update({
      where: { id },
      data: {
        kode: data.kode,
        uraian: data.uraian,
        id_kegiatan_HSPK: data.id_kegiatan_HSPK,
      },
    });
    return successResponse('Sub Kegiatan HSPK berhasil diperbarui', q);
  }

  async remove(id: number) {
    const findId = await this.prisma.subKegiatan_HSPK.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        'Sub Kegiatan HSPK dengan Id ' + id + ' tidak ditemukan',
      );
    }
    const q = this.prisma.subKegiatan_HSPK.delete({
      where: { id },
    });
    return successResponse('Sub Kegiatan HSPK berhasil dihapus', q);
  }

}
