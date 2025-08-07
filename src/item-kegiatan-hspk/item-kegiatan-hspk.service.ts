import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemKegiatanHspkDto } from './dto/create-item-kegiatan-hspk.dto';
import { UpdateItemKegiatanHspkDto } from './dto/update-item-kegiatan-hspk.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class ItemKegiatanHspkService {
  constructor(private prisma: PrismaService) { }
  async create(data: CreateItemKegiatanHspkDto) {
    const q = await this.prisma.itemKegiatanHSPK.create({ data });
    return successResponse('Item Kegiatan HSPK berhasil dibuat', q);
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
          sub_kegiatan_HSPK: {
            is: {
              kode: {
                contains: search,
              },
            },
          },
        },
        {
          sub_kegiatan_HSPK: {
            is: {
              kegiatan_HSPK: {
                is: {
                  kelompok_HSPK: {
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
      this.prisma.itemKegiatanHSPK.findMany({
        where,
        include: {
          sub_kegiatan_HSPK: {
            include: {
              kegiatan_HSPK: {
                include: {
                  kelompok_HSPK: true,
                },
              },
            },
          },
        },
        skip,
        take: perPage,

        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.itemKegiatanHSPK.count({ where }),
    ]);

    return successResponse('Berhasil mendapatkan item kegiatan HSPK', {
      data,
      total,

      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });

  }

  async findOne(id: number) {
    const findId = await this.prisma.itemKegiatanHSPK.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        `Item Kegiatan HSPK dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.itemKegiatanHSPK.findUnique({
      where: { id },
    });
    return successResponse(`Berhasil mendapatkan item kegiatan HSPK dengan ID ${id}`, {
      data: q,
    })
  }

  async update(id: number, data: UpdateItemKegiatanHspkDto) {
    const findId = await this.prisma.itemKegiatanHSPK.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        `Item Kegiatan HSPK dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.itemKegiatanHSPK.update({
      where: { id },
      data: {
        id_sub_kegiatan_HSPK: data.id_sub_kegiatan_HSPK,
        uraian: data.uraian,
      },
    });
    return successResponse(`Berhasil memperbarui item kegiatan HSPK dengan ID ${id}`, {
      data: q,
    })
  }

  remove(id: number) {
    const findId = this.prisma.itemKegiatanHSPK.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        `Item Kegiatan HSPK dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = this.prisma.itemKegiatanHSPK.delete({
      where: { id },
    });
    return successResponse(`Berhasil menghapus item kegiatan HSPK dengan ID ${id}`, {
      data: q,
    })
  }
}

