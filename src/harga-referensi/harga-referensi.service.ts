import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHargaReferensiDto } from './dto/create-harga-referensi.dto';
import { UpdateHargaReferensiDto } from './dto/update-harga-referensi.dto';
import { successResponse } from 'src/utils/response.util';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HargaReferensiService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateHargaReferensiDto) {
    const q = await this.prisma.harga_Referensi.create({
      data: {
        nama: data.nama,
        id_satuan: data.id_satuan,
        id_peraturan_tahunan: data.id_peraturan_tahunan,
        harga: data.harga,
      },
    });

    return successResponse('Harga referensi berhasil dibuat', q);
  }

  async findAll(page = 1, perPage = 10, search?: string) {
    const skip = (page - 1) * perPage;
    const where: any = {};
    where.deletedAt = null; // Ensure we only get non-deleted records

    if (search) {
      where.OR = [
        {
          nama: {
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
      this.prisma.harga_Referensi.findMany({
        where,
        skip,
        take: perPage,
        include: {
          satuan: true,
          peraturan_tahunan: true,
        },
      }),
      this.prisma.harga_Referensi.count({ where }),
    ]);

    return successResponse('Berhasil mendapatkan semua harga referensi', {
      data,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  }

  async findOne(id: number) {
    const findId = await this.prisma.harga_Referensi.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException(
        `Harga referensi dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.harga_Referensi.findUnique({
      where: { id },
      include: {
        satuan: true,
        peraturan_tahunan: true,
      },
    });

    return successResponse(
      `Berhasil mendapatkan harga referensi dengan ID ${id}`,
      q,
    );
  }

  async update(id: number, data: UpdateHargaReferensiDto) {
    const findId = await this.prisma.harga_Referensi.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException(
        `Harga referensi dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.harga_Referensi.update({
      where: { id },
      data: {
        nama: data.nama,
        id_satuan: data.id_satuan,
        id_peraturan_tahunan: data.id_peraturan_tahunan,
        harga: data.harga,
      },
    });
    return successResponse(
      `Berhasil memperbarui harga referensi dengan ID ${id}`,
      q,
    );
  }

  async remove(id: number) {
    const findId = await this.prisma.harga_Referensi.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException(
        `Harga refrensi dengan ID ${id} tidak ditemukan`,
      );
    }

    const q = await this.prisma.harga_Referensi.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
    return successResponse(
      `Berhasil menghapus harga refrensi dengan ID ${id}`,
      q,
    );
  }
}
