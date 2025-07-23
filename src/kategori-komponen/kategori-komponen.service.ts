import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKategoriKomponenDto } from './dto/create-kategori-komponen.dto';
import { UpdateKategoriKomponenDto } from './dto/update-kategori-komponen.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class KategoriKomponenService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateKategoriKomponenDto) {
    const q = await this.prisma.kategori_Komponen.create({
      data: {
        nama: data.nama,
      },

    });

    return successResponse('Kategori komponen berhasil dibuat', q);
  }

  async findAll() {
    const q = await this.prisma.kategori_Komponen.findMany({
      
      orderBy: {
        createdAt: 'desc',
      },
    });
    return successResponse('Berhasil mendapatkan semua kategori komponen', q);
  }

  findOne(id: number) {
    const findId = this.prisma.kategori_Komponen.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        `Kategori komponen dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = this.prisma.kategori_Komponen.findUnique({
      where: { id },
    });

    return successResponse(
      `Berhasil mendapatkan kategori komponen dengan ID ${id}`,
      q,
    );
  }

  update(id: number, data: UpdateKategoriKomponenDto) {
    const findId = this.prisma.kategori_Komponen.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        `Kategori komponen dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = this.prisma.kategori_Komponen.update({
      where: { id },
      data: {
        nama: data.nama,
      },
    });
    return successResponse(
      `Berhasil memperbarui kategori komponen dengan ID ${id}`,
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

    const q = await this.prisma.kategori_Komponen.delete({
      where: { id },
    });

    return successResponse(
      `Berhasil menghapus kategori komponen dengan ID ${id}`,
      q,
    );
  }
}
