import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKomponenAsbDto } from './dto/create-komponen-asb.dto';
import { UpdateKomponenAsbDto } from './dto/update-komponen-asb.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class KomponenAsbService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateKomponenAsbDto) {
    const q = await this.prisma.komponen_ASB.create({
      data: {
        id_kegiatan_asb: data.id_kegiatan_asb,
        uraian: data.uraian,
        id_kategori_komponen: data.id_kategori_komponen,
        id_satuan: data.id_satuan,
        koefisien: data.koefisien,
        hargaSatuan: data.hargaSatuan,
        jumlahHarga: data.jumlahHarga,
        urutan: data.urutan,
      },
    });

    return successResponse('Komponen ASB berhasil dibuat', q);
  }

  async findAll() {
    const q = await this.prisma.komponen_ASB.findMany({
      include: {
        kegiatan_asb: true,
        kategori_komponen: true,
        satuan: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return successResponse('Berhasil mendapatkan semua komponen ASB', q);
  }

  async findOne(id: number) {
    const findId = await this.prisma.komponen_ASB.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        `Komponen ASB dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.komponen_ASB.findUnique({
      where: { id },
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
      where: { id },
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
        hargaSatuan: data.hargaSatuan,
        jumlahHarga: data.jumlahHarga,
        urutan: data.urutan,
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
