import { BadRequestException, Injectable } from '@nestjs/common';

import { successResponse } from 'src/utils/response.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePkptDto } from './dto/create-pkpt.dto';
import { UpdatePkptDto } from './dto/update-pkpt.dto';

@Injectable()
export class PkptService {
  constructor(private prisma: PrismaService) { }
  async create(data: CreatePkptDto) {
    const q = await this.prisma.pKPT.create({
      data: {
        area_pengawasan: data.area_pengawasan,
        tujuan: data.tujuan,
        id_jenis_pengawasan: data.id_jenis_pengawasan,
        ruang_lingkup: data.ruang_lingkup,

        createdBy: data.createdBy ?? '',
      },
    });
    return successResponse('Pkpt berhasil dibuat', q);

  }

  async findAll(
    page: number,
    perPage: number,
    search?: string,
    orderBy?: string,
    order?: string,
    year?: number

  ) {
    const skip = (page - 1) * perPage;
    const where: any = {};

    if (search) {
      where.OR = [{ tujuan: { contains: search } }, { area_penugasan: { contains: search } }];
    }
    if (year) {
      where.createdAt = { gte: new Date(year, 0, 1), lte: new Date(year, 11, 31) };
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.pKPT.findMany({
        where,
        skip,
        take: perPage,
        orderBy: {
          [orderBy ? orderBy : 'createdAt']: order,
        },
        include: {
          jenis_pengawasan: true,
        },
      }),
      this.prisma.pKPT.count({ where }),
    ]);
    return successResponse('Pkpt ditemukan', {
      data,
      total,
      page,
      perPage,
    });

  }



  async findOne(id: number) {
    const findId = await this.prisma.pKPT.findUnique({
      where: { id },
      include: { jenis_pengawasan: true },
    });
    if (!findId) {
      throw new BadRequestException('Pkpt dengan Id ' + id + ' tidak ditemukan');
    }
    return successResponse('Pkpt ditemukan', findId);

  }

  async update(id: number, data: UpdatePkptDto) {

    const findId = await this.prisma.pKPT.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException('Pkpt dengan Id ' + id + ' tidak ditemukan');
    }
    const q = await this.prisma.pKPT.update({
      where: { id },
      data: {
        area_pengawasan: data.area_pengawasan,
        tujuan: data.tujuan,
        id_jenis_pengawasan: data.id_jenis_pengawasan,
        ruang_lingkup: data.ruang_lingkup,
        updatedBy: data.updatedBy ?? '',
      },
    });
    return successResponse('Pkpt berhasil diupdate', q);

  }

  async remove(id: number) {
    const findId = await this.prisma.pKPT.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException('Pkpt dengan Id ' + id + ' tidak ditemukan');
    }
    const q = await this.prisma.pKPT.delete({
      where: { id },
    });
    return successResponse('Pkpt berhasil dihapus', q);
  }
}
