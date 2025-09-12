import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKelompokPengawasanDto } from './dto/create-kelompok_pengawasan.dto';
import { UpdateKelompokPengawasanDto } from './dto/update-kelompok_pengawasan.dto';
import { successResponse } from 'src/utils/response.util';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class KelompokPengawasanService {
  constructor(private prisma: PrismaService) { }
  async create(createKelompokPengawasanDto: CreateKelompokPengawasanDto) {
    const q = await this.prisma.kelompok_pengawasan.create({
      data: {
        name: createKelompokPengawasanDto.name,
        createdBy: createKelompokPengawasanDto.createdBy ?? '',
      },
    });
    return successResponse('Kelompok pengawasan berhasil dibuat', q);
  }

  async findAll(
    page: number,
    perPage: number,
    search?: string,
    orderBy?: string,
    order?: string,

  ) {
    const skip = (page - 1) * perPage;
    const where: any = {};
    where.deletedAt = null;
    if (search) {
      where.OR = [{ name: { contains: search } }];
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.kelompok_pengawasan.findMany({
        where,
        skip,
        take: perPage,
        orderBy: {
          [orderBy ? orderBy : 'createdAt']: order,
        },
        include: {
          Item_pengawasan: true,
        },
      }),
      this.prisma.kelompok_pengawasan.count({ where }),
    ]);
    return successResponse('Kelompok pengawasan ditemukan', {
      data,
      total,
      page,
      perPage,
    });
  }

  async findOne(id: number) {

    const q = await this.prisma.kelompok_pengawasan.findUnique({
      where: { id, deletedAt: null },
      include: {
        Item_pengawasan: true,
      },
    });
    if (!q) {
      throw new BadRequestException('Kelompok pengawasan dengan Id ' + id + ' tidak ditemukan');
    }
    return successResponse('Kelompok pengawasan ditemukan', q);

  }

  async update(id: number, updateKelompokPengawasanDto: UpdateKelompokPengawasanDto) {
    const findId = await this.prisma.kelompok_pengawasan.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new Error('Kelompok pengawasan dengan Id ' + id + ' tidak ditemukan');
    }
    const q = await this.prisma.kelompok_pengawasan.update({
      where: { id },
      data: {
        name: updateKelompokPengawasanDto.name,
        updatedBy: updateKelompokPengawasanDto.updatedBy ?? '',
        updatedAt: new Date(),
      },
    });
    return successResponse('Kelompok pengawasan berhasil diupdate', q);
  }

  async remove(id: number) {
    const findId = await this.prisma.kelompok_pengawasan.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException('Kelompok pengawasan dengan Id ' + id + ' tidak ditemukan');
    }
    const q = await this.prisma.kelompok_pengawasan.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
    return successResponse('Kelompok pengawasan berhasil dihapus', q);
  }
}
