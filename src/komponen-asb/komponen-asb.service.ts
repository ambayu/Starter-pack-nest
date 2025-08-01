import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKomponenAsbDto } from './dto/create-komponen-asb.dto';
import { UpdateKomponenAsbDto } from './dto/update-komponen-asb.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';
import { contains } from 'class-validator';
import * as XLSX from 'xlsx';

@Injectable()
export class KomponenAsbService {
  constructor(private prisma: PrismaService) { }
  async create(data: CreateKomponenAsbDto) {
    const q = await this.prisma.komponen_ASB.create({
      data: {
        uraian: data.uraian,
        id_kegiatan_asb: data.id_kegiatan_asb,
        id_satuan: data.id_satuan,
        id_sub_kegiatan_asb: data.id_sub_kegiatan_asb,
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
            is: {
              nama: {
                contains: search,
              },
            },
          },
        },
        {
          sub_kegiatan_asb: {
            is: {
              kode: {
                contains: search,
              },
            },
          },
        },
        {
          kegiatan_asb: {
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
      this.prisma.komponen_ASB.findMany({
        where,
        skip,
        take: perPage,
        include: {
          kegiatan_asb: true,
          sub_kegiatan_asb: true,
          satuan: true,
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
        sub_kegiatan_asb: true,
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
        id_sub_kegiatan_asb: data.id_sub_kegiatan_asb,
        uraian: data.uraian,
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


  private convertToDecimal(value: string | number | undefined): number {
    if (value === undefined) {
      return 0;
    }
    if (typeof value === 'number') {
      return value; // Jika sudah number, gunakan langsung
    }
    if (typeof value === 'string') {
      const cleanedValue = value.replace(/Rp|\,| /g, '').trim();
      return parseFloat(cleanedValue) || 0;
    }
    return 0; // Default jika tipe tidak dikenali
  }
}
