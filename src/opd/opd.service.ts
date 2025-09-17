import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse, errorResponse } from 'src/utils/response.util';
import { CreateOpdDto } from './dto/create-opd.dto';
import { UpdateOpdDto } from './dto/update-opd.dto';

@Injectable()
export class OpdService {
  constructor(private prisma: PrismaService) { }

  // CREATE
  async create(data: CreateOpdDto) {
    const exists = await this.prisma.opd.findFirst({
      where: { kode: data.kode },
    });
    if (exists) {
      throw new BadRequestException(
        errorResponse(`OPD dengan kode ${data.kode} sudah ada`, 'OPD_EXISTS'),
      );
    }

    const opd = await this.prisma.opd.create({ data });

    return successResponse('OPD berhasil dibuat', opd);
  }

  // GET ALL (pagination + search)
  async findAll(pages = 1, perPage = 10, search?: string, order?: string, orderBy?: string) {
    const skip = (pages - 1) * perPage;

    const where: any = {};
    if (search) {
      where.OR = [
        { nama: { contains: search } },
        { kode: { contains: search } },
      ];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.opd.findMany({
        where,
        skip,
        take: perPage,
        orderBy: {
          [orderBy ? orderBy : 'createdAt']: order,
        }
      }),
      this.prisma.opd.count({ where }),
    ]);

    return successResponse('Data OPD ditemukan', {
      data,
      total,
      pages,
      perPage,
    });

  }


  // GET ONE
  async findById(id: number) {
    const opd = await this.prisma.opd.findUnique({ where: { id } });
    if (!opd) {
      throw new BadRequestException(
        errorResponse(`OPD dengan ID ${id} tidak ditemukan`, 'OPD_NOT_FOUND'),
      );
    }
    return successResponse('Data OPD ditemukan', opd);
  }

  // UPDATE
  async update(id: number, data: UpdateOpdDto) {
    const opd = await this.prisma.opd.findUnique({ where: { id } });
    if (!opd) {
      throw new BadRequestException(
        errorResponse(`OPD dengan ID ${id} tidak ditemukan`, 'OPD_NOT_FOUND'),
      );
    }

    const updated = await this.prisma.opd.update({
      where: { id },
      data,
    });

    return successResponse('OPD berhasil diperbarui', updated);
  }

  // DELETE
  async delete(id: number) {
    const opd = await this.prisma.opd.findUnique({ where: { id } });
    if (!opd) {
      throw new BadRequestException(
        errorResponse(`OPD dengan ID ${id} tidak ditemukan`, 'OPD_NOT_FOUND'),
      );
    }

    const deleted = await this.prisma.opd.delete({ where: { id } });
    return successResponse('OPD berhasil dihapus', deleted);
  }
}
