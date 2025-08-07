import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemKegiatanAsbDto } from './dto/create-item-kegiatan-asb.dto';
import { UpdateItemKegiatanAsbDto } from './dto/update-item-kegiatan-asb.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';
import { KegiatanAsb } from 'src/kegiatan-asb/entities/kegiatan-asb.entity';

@Injectable()
export class ItemKegiatanAsbService {
  constructor(private prisma: PrismaService) { }
  async create(data: CreateItemKegiatanAsbDto) {
    const q = await this.prisma.itemKegiatanASB.create({ data });
    return successResponse('Item Kegiatan ASB berhasil dibuat', q);
  }

  async findAll(
    page: number,
    perPage: number,
    search?: string

  ) {
    const skip = (page - 1) * perPage;
    const where: any = {};
    if (search) {
      where.OR = [

        { uraian: { contains: search } },
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
          sub_kegiatan_asb: {
            is: {
              kegiatan_asb: {
                is: {
                  kelompok_asb: {
                    is: {
                      kode: {
                        contains: search,
                      },
                    },
                  },
                },
              },
            },
          },
        },

      ];
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.itemKegiatanASB.findMany({
        where,
        include: {
          sub_kegiatan_asb: {
            include: {
              kegiatan_asb: {
                include: {
                  kelompok_asb: true,
                },
              },
            },
          },
        },
        skip,
        take: perPage,

        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.itemKegiatanASB.count({ where }),
    ]);

    return successResponse('Berhasil mendapatkan item kegiatan asb', {
      data,
      total,

      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });

  }

  async findOne(id: number) {
    const findId = await this.prisma.itemKegiatanASB.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        `Item Kegiatan ASB dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.itemKegiatanASB.findUnique({
      where: { id },
    });
    return successResponse(`Berhasil mendapatkan item kegiatan asb dengan ID ${id}`, {
      data: q,
    })
  }

  async update(id: number, data: UpdateItemKegiatanAsbDto) {
    const findId = await this.prisma.itemKegiatanASB.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        `Item Kegiatan ASB dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.itemKegiatanASB.update({
      where: { id },
      data: {
        id_sub_kegiatan_asb: data.id_sub_kegiatan_asb,
        uraian: data.uraian,
      },
    });
    return successResponse(`Berhasil memperbarui item kegiatan asb dengan ID ${id}`, {
      data: q,
    })
  }

  remove(id: number) {
    const findId = this.prisma.itemKegiatanASB.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        `Item Kegiatan ASB dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = this.prisma.itemKegiatanASB.delete({
      where: { id },
    });
    return successResponse(`Berhasil menghapus item kegiatan asb dengan ID ${id}`, {
      data: q,
    })
  }
}
