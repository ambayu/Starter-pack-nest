import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKomponenAsbDto } from './dto/create-komponen-asb.dto';
import { UpdateKomponenAsbDto } from './dto/update-komponen-asb.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';
import { contains } from 'class-validator';

@Injectable()
export class KomponenAsbService {
  constructor(private prisma: PrismaService) { }
  async create(data: CreateKomponenAsbDto) {
    const q = await this.prisma.komponen_ASB.create({
      data: {
        id_kegiatan_asb: data.id_kegiatan_asb,
        uraian: data.uraian,
        id_kategori_komponen: data.id_kategori_komponen,
        id_satuan: data.id_satuan,
        koefisien: data.koefisien,
        harga_satuan: data.harga_satuan,
        jumlah_harga: data.jumlah_harga,
      },
    });

    return successResponse('Komponen ASB berhasil dibuat', q);
  }

  async findAll(page = 1, perPage = 10, search?: string) {
    const skip = (page - 1) * perPage;
    const where: any = {};
    where.deletedAt = null; // Pastikan hanya mengambil data yang tidak dihapus
    if (search) {
      where.OR = [
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
          kategori_komponen: {
            nama: {
              contains: search,

            },
          },
        },
      ];
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.komponen_ASB.findMany({
        where,
        skip,
        take: perPage,
        include: {
          kegiatan_asb: true,
          satuan: true,
          kategori_komponen: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.komponen_ASB.count({ where }),
    ]);
    return successResponse('Berhasil mendapatkan semua komponen ASB', {
      data,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  }

  async findOne(id: number) {
    const findId = await this.prisma.komponen_ASB.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException(
        `Komponen ASB dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.komponen_ASB.findUnique({
      where: { id, deletedAt: null },
      include: {
        kegiatan_asb: true,
        kategori_komponen: true,
        satuan: true,
      },
    });
    return successResponse(
      `Berhasil mendapatkan komponen ASB dengan ID ${id}`,
      q,
    );
  }

  async update(id: number, data: UpdateKomponenAsbDto) {
    const findId = await this.prisma.komponen_ASB.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException(
        `Komponen ASB dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.komponen_ASB.update({
      where: { id },
      data: {
        id_kegiatan_asb: data.id_kegiatan_asb,
        uraian: data.uraian,
        id_kategori_komponen: data.id_kategori_komponen,
        id_satuan: data.id_satuan,
        koefisien: data.koefisien,
        harga_satuan: data.harga_satuan,
        jumlah_harga: data.jumlah_harga,
      },
    });

    return successResponse(
      `Berhasil memperbarui komponen ASB dengan ID ${id}`,
      q,
    );
  }

  async remove(id: number) {
    const findId = await this.prisma.komponen_ASB.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        `Komponen ASB dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.komponen_ASB.delete({
      where: { id },
    });

    return successResponse(
      `Berhasil menghapus komponen ASB dengan ID ${id}`,
      q,
    );
  }
}
