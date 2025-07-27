import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKategoriKomponenDto } from './dto/create-kategori-komponen.dto';
import { UpdateKategoriKomponenDto } from './dto/update-kategori-komponen.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class KategoriKomponenService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateKategoriKomponenDto) {
    const findNama = await this.prisma.kategori_Komponen.findUnique({
      where: { nama: data.nama },
    });
    if (findNama) {
      throw new BadRequestException(
        `Kategori komponen dengan nama ${data.nama} sudah ada`,
      );
    }

    const q = await this.prisma.kategori_Komponen.create({
      data: {
        nama: data.nama,
      },
    });

    return successResponse('Kategori komponen berhasil dibuat', q);
  }

  async findAll(page = 1, perPage = 10, nama?: string) {
    const skip = (page - 1) * perPage;

    const where: any = {};

    where.deletedAt = null; // Pastikan hanya mengambil data yang tidak dihapus
    if (nama) {
      where.nama = {
        contains: nama,
      };
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.kategori_Komponen.findMany({
        skip,
        take: perPage,
        where,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.kategori_Komponen.count({ where }),
    ]);
    return successResponse('Berhasil mendapatkan kategori komponen', {
      data,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  }

  async findOne(id: number) {
    const findId = await this.prisma.kategori_Komponen.findUnique({
      where: { id,deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException(
        `Kategori komponen dengan ID ${id} tidak ditemukan`,
      );
    }

    const q = await this.prisma.kategori_Komponen.findUnique({
      where: { id, deletedAt: null },
    });

    return successResponse(
      `Berhasil mendapatkan kategori komponen dengan ID ${id}`,
      q,
    );
  }

  async update(id: number, data: UpdateKategoriKomponenDto) {
    const findId = await this.prisma.kategori_Komponen.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException(
        `Kategori komponen dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.kategori_Komponen.update({
      where: { id },
      data: {
        nama: data.nama,
      },
    });
    return successResponse(
      `Berhasil memperbarui kategori komponen dengan Nama ${id}`,
      q,
    );
  }

  async remove(id: number) {
    const findId = await this.prisma.kategori_Komponen.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        `Kategori komponen dengan ID ${id} tidak ditemukan`,
      );
    }

    const q = await this.prisma.kategori_Komponen.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
    return successResponse(
      `Berhasil menghapus kategori komponen dengan ID ${id}`,
      q,
    );
  }
}
