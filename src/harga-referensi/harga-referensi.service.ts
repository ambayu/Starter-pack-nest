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

  async findAll() {
    const q = await this.prisma.harga_Referensi.findMany({
      include: {
        satuan: true,
        peraturan_tahunan: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return successResponse('Berhasil mendapatkan semua harga referensi', q);
  }

  async findOne(id: number) {
    const findId = await this.prisma.harga_Referensi.findUnique({
      where: { id },
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
      where: { id },
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

  remove(id: number) {
    return `This action removes a #${id} hargaReferensi`;
  }
}
