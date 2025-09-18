import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJenisPengawasanDto } from './dto/create-jenis_pengawasan.dto';
import { UpdateJenisPengawasanDto } from './dto/update-jenis_pengawasan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class JenisPengawasanService {
  constructor(private prisma: PrismaService) { }
  async create(data: CreateJenisPengawasanDto) {
    const findName = await this.prisma.jenis_pengawasan.findFirst({
      where: { name: data.name, deletedAt: null },
    });

    if (findName) throw new BadRequestException('Nama jenis pengawasan sudah digunakan');

    const q = await this.prisma.jenis_pengawasan.create({
      data: {
        name: data.name,
        createdBy: data.createdBy ?? 0,
      },
    });
    return successResponse('Jenis pengawasan berhasil dibuat', q);
  }

  /**
   * This action returns all jenisPengawasan
   */
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
      this.prisma.jenis_pengawasan.findMany({
        where,
        skip,
        take: perPage,
        orderBy: {
          [orderBy ? orderBy : 'createdAt']: order,
        },
      }),
      this.prisma.jenis_pengawasan.count({ where }),
    ]);

    return successResponse('Jenis pengawasan ditemukan', {
      data,
      total,
      page,
      perPage,
    });

  }

  async findOne(id: number) {
    const findId = await this.prisma.jenis_pengawasan.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException(
        'Jenis pengawasan dengan Id ' + id + ' tidak ditemukan',
      );
    }
    return successResponse('Jenis pengawasan ditemukan', findId);
  }

  async update(id: number, data: UpdateJenisPengawasanDto) {
    const findId = this.prisma.jenis_pengawasan.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException(
        'Jenis pengawasan dengan Id ' + id + ' tidak ditemukan',
      );
    }
    return this.prisma.jenis_pengawasan.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
        updatedBy: data.updatedBy ?? null,
      },
    });
  }

  async remove(id: number) {

    const findId = await this.prisma.jenis_pengawasan.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException(
        'Jenis pengawasan dengan Id ' + id + ' tidak ditemukan',
      );
    }
    const q = await this.prisma.jenis_pengawasan.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
    return successResponse('Jenis pengawasan berhasil dihapus', q);
  }

}
