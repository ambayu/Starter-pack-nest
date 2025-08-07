import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKegiatanHspkDto } from './dto/create-kegiatan-hspk.dto';
import { UpdateKegiatanHspkDto } from './dto/update-kegiatan-hspk.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class KegiatanHspkService {

  constructor(private prisma: PrismaService) { }
  async create(data: CreateKegiatanHspkDto) {
    const findIdKelompok = await this.prisma.kegiatan_HSPK.findFirst({ where: { id_kelompok_HSPK: data.id_kelompok_HSPK } });
    if (findIdKelompok) {
      const findKode = await this.prisma.kegiatan_HSPK.findFirst({ where: { kode: data.kode } });
      if (findKode) {
        throw new BadRequestException('Kelompok HSPK ini dengan kode ' + data.kode + ' sudah ada');
      }
    }
    const q = await this.prisma.kegiatan_HSPK.create({
      data: {
        kode: data.kode,
        uraian: data.uraian,
        id_kelompok_HSPK: data.id_kelompok_HSPK,
      },
    });

    return successResponse('Kegiatan HSPK berhasil dibuat', q);
  }


  async findAll(page = 1, perPage = 10, search?: string) {
    const skip = (page - 1) * perPage;
    const where: any = {};
    if (search) {
      where.OR = [
        { kode: { contains: search } },
        { uraian: { contains: search } },
        {
          kelompok_HSPK: {
            is: {
              kode: {
                contains: search,
              },
            },
          },
        },
      ];
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.kegiatan_HSPK.findMany({
        where,
        skip,
        take: perPage,
        include: {
          kelompok_HSPK: true,
        },

        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.kegiatan_HSPK.count({ where }),
    ]);
    return successResponse('Berhasil mendapatkan semua kegiatan HSPK', {
      data,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  }

  async findOne(id: number) {
    const findId = await this.prisma.kegiatan_HSPK.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        `Kegiatan HSPK dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.kegiatan_HSPK.findUnique({
      where: { id },

    });

    return successResponse(
      `Berhasil mendapatkan kegiatan HSPK dengan ID ${id}`,
      q,
    );
  }

  async update(id: number, data: UpdateKegiatanHspkDto) {
    const findId = await this.prisma.kegiatan_HSPK.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        `Kegiatan HSPK dengan ID ${id} tidak ditemukan`,
      );
    }
    const findIdKelompok = await this.prisma.kegiatan_HSPK.findFirst({ where: { id_kelompok_HSPK: data.id_kelompok_HSPK } });
    if (findIdKelompok) {
      const findKode = await this.prisma.kegiatan_HSPK.findFirst({ where: { kode: data.kode } });
      if (findKode) {
        throw new BadRequestException('Kelompok HSPK ini dengan kode ' + data.kode + ' sudah ada');
      }
    }
    const q = await this.prisma.kegiatan_HSPK.update({
      where: { id },
      data: {
        id_kelompok_HSPK: data.id_kelompok_HSPK,
        kode: data.kode,
        uraian: data.uraian,
      },
    });
    return successResponse(
      `Berhasil memperbarui kegiatan HSPK dengan ID ${id}`,
      q,
    );
  }

  async remove(id: number) {
    const findId = await this.prisma.kegiatan_HSPK.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        `Kegiatan HSPK dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.kegiatan_HSPK.delete({
      where: { id },
    });
    return successResponse(
      `Berhasil menghapus kegiatan HSPK dengan ID ${id}`,
      q,
    );
  }
}
