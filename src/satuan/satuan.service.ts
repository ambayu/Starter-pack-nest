import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSatuanDto } from './dto/create-satuan.dto';
import { UpdateSatuanDto } from './dto/update-satuan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class SatuanService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateSatuanDto) {
    const q = await this.prisma.satuan.create({
      data: {
        nama: data.nama,
      },
    });

    return successResponse('Satuan berhasil dibuat', q);
  }

  async findAll() {
    const q = await this.prisma.satuan.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return successResponse('Berhasil mendapatkan semua satuan', q);
  }

  async findOne(id: number) {
    const findId = await this.prisma.satuan.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(`Satuan dengan ID ${id} tidak ditemukan`);
    }
    const q = this.prisma.satuan.findUnique({
      where: { id },
    });
    return successResponse(`Berhasil mendapatkan satuan dengan ID ${id}`, q);
  }

  async update(id: number, data: UpdateSatuanDto) {
    const findId = await this.prisma.satuan.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(`Satuan dengan ID ${id} tidak ditemukan`);
    }

    const q = await this.prisma.satuan.update({
      where: { id },
      data: {
        nama: data.nama,
      },
    });

    return successResponse(`Berhasil memperbarui satuan dengan ID ${id}`, q);
  }

 async remove(id: number) {
    const findId = await this.prisma.satuan.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(`Satuan dengan ID ${id} tidak ditemukan`);
    }
    const q = this.prisma.satuan.delete({
      where: { id },
    });
    return successResponse(`Berhasil menghapus satuan dengan ID ${id}`, q);
  }
}
