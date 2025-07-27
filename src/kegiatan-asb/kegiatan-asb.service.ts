import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKegiatanAsbDto } from './dto/create-kegiatan-asb.dto';
import { UpdateKegiatanAsbDto } from './dto/update-kegiatan-asb.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class KegiatanAsbService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateKegiatanAsbDto) {
    const q = await this.prisma.kegiatan_ASB.create({
      data: {
        kode: data.kode,
        uraian: data.uraian,
        id_satuan: data.id_satuan,
        id_peraturan_tahunan: data.id_peraturan_tahunan,
      },
    });

    return successResponse('Kegiatan ASB berhasil dibuat', q);
  }

  async findAll(page = 1, perPage = 10, search?: string) {
    const skip = (page - 1) * perPage;
    const where: any = {};
    where.deletedAt = null; // Pastikan hanya mengambil data yang tidak dihapus
    if (search) {
      where.OR = [
        {
          kode: {
            contains: search,
          },
        },
        {
          uraian: {
            contains: search,
          },
        },
        {
          satuan: {
            nama: {
              contains: search,
            },
          },
        },
        {
          peraturan_tahunan: {
            peraturan: {
              contains: search,
            },
          },
        },
      ];
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.kegiatan_ASB.findMany({
        where,
        skip,
        take: perPage,
        include: {
          satuan: true,
          peraturan_tahunan: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.kegiatan_ASB.count({ where }),
    ]);
    return successResponse('Berhasil mendapatkan semua kegiatan ASB', {
      data,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
    
  }

  async findOne(id: number) {
    const findId = await this.prisma.kegiatan_ASB.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException(
        `Kegiatan ASB dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.kegiatan_ASB.findUnique({
      where: { id },
      include: {
        satuan: true,
        peraturan_tahunan: true,
      },
    });

    return successResponse(
      `Berhasil mendapatkan kegiatan ASB dengan ID ${id}`,
      q,
    );
  }

  async update(id: number, data: UpdateKegiatanAsbDto) {
    const findId = await this.prisma.kegiatan_ASB.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException(
        `Kegiatan ASB dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.kegiatan_ASB.update({
      where: { id },
      data: {
        kode: data.kode,
        uraian: data.uraian,
        id_satuan: data.id_satuan,
        id_peraturan_tahunan: data.id_peraturan_tahunan,
      },
    });
    return successResponse(
      `Berhasil memperbarui kegiatan ASB dengan ID ${id}`,
      q,
    );
  }

  async remove(id: number) {
    const findId = await this.prisma.kegiatan_ASB.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException(
        `Kegiatan ASB dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.kegiatan_ASB.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
    return successResponse(
      `Berhasil menghapus kegiatan ASB dengan ID ${id}`,
      q,
    );
    
  }
}
