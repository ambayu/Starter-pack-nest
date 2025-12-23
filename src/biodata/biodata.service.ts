import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { successResponse, errorResponse } from 'src/utils/response.util';
import { CreateBiodataDto } from './dto/create-biodata.dto';
import { updateBiodataDto } from './dto/update-biodata.dto';

@Injectable()
export class BiodataService {
  constructor(private prisma: PrismaService) { }

  // CREATE
  async create(data: CreateBiodataDto) {
    const user = await this.prisma.user.findUnique({ where: { id: data.id_user } });
    if (!user) {
      throw new BadRequestException(`User dengan ID ${data.id_user} tidak ditemukan`);
    }

    const existing = await this.prisma.biodata.findUnique({ where: { id_user: data.id_user } });
    if (existing) {
      throw new BadRequestException(`Biodata dengan User ID ${data.id_user} sudah ada`);
    }

    const biodata = await this.prisma.biodata.create({
      data: {
        id_user: data.id_user,
        alamat: data.alamat,
        no_telp: data.no_telp,
        kota: data.kota,
        kode_pos: data.kode_pos,
        photo: data.photo,
        tanggal_lahir: data.tanggal_lahir,
        jenis_kelamin: data.jenis_kelamin,
      },
    });

    return successResponse('Biodata berhasil dibuat', biodata);
  }

  // GET ALL
  async findAll() {
    const biodata = await this.prisma.biodata.findMany({
      include: { user: true },
    });
    return successResponse('Daftar biodata ditemukan', biodata);
  }

  // GET BY ID
  async findById(id: number) {
    const biodata = await this.prisma.biodata.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!biodata) {
      throw new NotFoundException(
        errorResponse(`Biodata dengan ID ${id} tidak ditemukan`, 'BIODATA_NOT_FOUND', 404),
      );
    }
    return successResponse('Biodata ditemukan', biodata);
  }

  // UPDATE
  async update(id: number, data: updateBiodataDto) {
    const biodata = await this.prisma.biodata.findUnique({ where: { id } });
    if (!biodata) {
      throw new NotFoundException(`Biodata dengan ID ${id} tidak ditemukan`);
    }

    const updated = await this.prisma.biodata.update({
      where: { id },
      data: {
        alamat: data.alamat,
        no_telp: data.no_telp,
        kota: data.kota,
        kode_pos: data.kode_pos,
        photo: data.photo,
        tanggal_lahir: data.tanggal_lahir,
        jenis_kelamin: data.jenis_kelamin,
      },
    });

    return successResponse('Biodata berhasil diperbaharui', updated);
  }

  // DELETE
  async destroy(id: number) {

    return "Biodata berhasil dihapus";
  }
}
