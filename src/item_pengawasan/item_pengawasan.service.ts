import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemPengawasanDto } from './dto/create-item_pengawasan.dto';
import { UpdateItemPengawasanDto } from './dto/update-item_pengawasan.dto';
import { successResponse } from 'src/utils/response.util';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemPengawasanService {
  constructor(private prisma: PrismaService) { }
  async create(data: CreateItemPengawasanDto) {
    const q = await this.prisma.item_pengawasan.create({
      data: {
        id_kelompok_pengawasan: data.id_kelompok_pengawasan,
        name: data.name,
        createdBy: data.createdBy ?? 0,
      },
    });
    return successResponse('Item pengawasan berhasil dibuat', q);
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
      this.prisma.item_pengawasan.findMany({
        where,
        skip,
        take: perPage,
        orderBy: {
          [orderBy ? orderBy : 'createdAt']: order,
        },
        include: {
          kelompok_pengawasan: true,
        },
      }),
      this.prisma.item_pengawasan.count({ where }),
    ]);
    return successResponse('Item pengawasan ditemukan', {
      data,
      total,
      page,
      perPage,
    });
  }

  async findOne(id: number) {
    const findId = await this.prisma.item_pengawasan.findUnique({
      where: { id, deletedAt: null },
      include: { kelompok_pengawasan: true },
    });

    if (!findId) {
      throw new BadRequestException('Item pengawasan dengan Id ' + id + ' tidak ditemukan');
    }
    return successResponse('Item pengawasan ditemukan', findId);


  }

  async findByKelompokPengawasan(id: number) {
    const findid = await this.prisma.kelompok_pengawasan.findUnique({
      where: { id, deletedAt: null },
    })

    if (!findid) {
      throw new BadRequestException('Kelompok pengawasan dengan Id ' + id + ' tidak ditemukan');
    }
    const q = await this.prisma.item_pengawasan.findMany({
      where: { id_kelompok_pengawasan: id, deletedAt: null },
    });
    return successResponse('Item pengawasan ditemukan', q);
  }



  async update(id: number, data: UpdateItemPengawasanDto) {
    const findId = await this.prisma.item_pengawasan.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException('Item pengawasan dengan Id ' + id + ' tidak ditemukan');
    }
    const q = await this.prisma.item_pengawasan.update({
      where: { id },
      data: {
        name: data.name,
        updatedBy: data.updatedBy ?? null,
      },
    });

    return successResponse('Item pengawasan berhasil diubah', q);


  }

  async remove(id: number) {
    const findId = await this.prisma.item_pengawasan.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException('Item pengawasan dengan Id ' + id + ' tidak ditemukan');
    }
    const q = await this.prisma.item_pengawasan.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
    return successResponse('Item pengawasan berhasil dihapus', q);
  }
}
