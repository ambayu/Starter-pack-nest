import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJenisPenugasanDto } from './dto/create-jenis-penugasan.dto';
import { UpdateJenisPenugasanDto } from './dto/update-jenis-penugasan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class JenisPenugasanService {
  constructor(private prisma: PrismaService) { }
  async create(data: CreateJenisPenugasanDto) {
    console.log(data, 'data');
    const q = await this.prisma.jenisPenugasan.upsert({
      where: { id: data.id ?? 0 }, // kalau id ada → update, kalau tidak → create
      update: {
        jenis_penugasan: data.jenis_penugasan,
        id_pkpt: data.id_pkpt ?? null,
        non_pkpt: data.non_pkpt,
        updatedBy: data.createdBy ?? null,
        Penugasan: data.Penugasan
          ? {
            upsert: {
              where: { id: data.Penugasan.id ?? 0 },
              update: {
                dasar_penugasan: data.Penugasan.dasar_penugasan ?? '',
                sifat_penugasan: data.Penugasan.sifat_penugasan ?? '',
                nama_penugasan: data.Penugasan.nama_penugasan ?? '',
                alamat_penugasan: data.Penugasan.alamat_penugasan ?? '',
                catatan: data.Penugasan.catatan ?? '',
                susunan_tim: data.Penugasan.susunan_tim
                  ? {
                    deleteMany: {},
                    create: data.Penugasan.susunan_tim.map((r) => ({
                      id_peran: r.id_peran,
                      nip: r.nip,
                    })),
                  }
                  : undefined,
              },
              create: {
                dasar_penugasan: data.Penugasan.dasar_penugasan ?? '',
                sifat_penugasan: data.Penugasan.sifat_penugasan ?? '',
                nama_penugasan: data.Penugasan.nama_penugasan ?? '',
                alamat_penugasan: data.Penugasan.alamat_penugasan ?? '',
                catatan: data.Penugasan.catatan ?? '',

                susunan_tim: data.Penugasan.susunan_tim
                  ? {
                    create: data.Penugasan.susunan_tim.map((r) => ({
                      id_peran: r.id_peran,
                      nip: r.nip,
                    })),
                  }
                  : undefined,
              },
            },
          }
          : undefined,
      },
      create: {
        jenis_penugasan: data.jenis_penugasan,
        id_pkpt: data.id_pkpt ?? null,
        non_pkpt: data.non_pkpt,
        createdBy: data.createdBy ?? 0,
        Penugasan: data.Penugasan
          ? {
            create: {
              dasar_penugasan: data.Penugasan.dasar_penugasan ?? '',
              sifat_penugasan: data.Penugasan.sifat_penugasan ?? '',
              nama_penugasan: data.Penugasan.nama_penugasan ?? '',
              alamat_penugasan: data.Penugasan.alamat_penugasan ?? '',
              catatan: data.Penugasan.catatan ?? '',
              susunan_tim: data.Penugasan.susunan_tim
                ? {
                  create: data.Penugasan.susunan_tim.map((r) => ({
                    id_peran: r.id_peran,
                    nip: r.nip,
                  })),
                }
                : undefined,
            },
          }
          : undefined,
      },
      include: {
        Penugasan: {
          include: { rute_perencanaan: true, susunan_tim: true },
        },
      },
    });

    return successResponse('Penugasan berhasil dibuat/diupdate', q);
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

    if (search) {
      where.OR = [{ jenis_penugasan: { contains: search } }];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.jenisPenugasan.findMany({
        skip,
        take: perPage,
        include: {
          Penugasan: {
            include: {
              susunan_tim: { include: { peran: true, user: true } },
              rute_perencanaan: true,
              km1: true,
              km2: {
                include: {
                  km2_rincian_pekerjaan: {
                    include: {
                      km2Pelaksanaan: {
                        include: { peran: true },
                      },
                      item_pengawasan: true,
                      kelompok_pengawasan: true,
                    },
                  },
                },
              },
              km3: {
                include: {
                  km3_rincian_pekerjaan: true,
                  km3_peran: { include: { peran: true } },
                },
              },
              km4: {
                include: {
                  tujuan: {
                    include: {
                      program_kerja: {
                        include: {
                          auditors: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          pkpt: true,
        },
        orderBy: {
          [orderBy ? orderBy : 'createdAt']: order,
        },
      }),
      this.prisma.jenisPenugasan.count({ where }),
    ]);

    return successResponse('Penugasan ditemukan', {
      data,
      total,
      page,
      perPage,
    });
  }


  async findOne(id: number) {
    const findId = await this.prisma.jenisPenugasan.findUnique({
      where: { id },
      include: {
        Penugasan: {
          include: {
            rute_perencanaan: true,
            susunan_tim: { include: { peran: true } },

            // Tambahan KM
            km1: true,
            km2: {
              include: {
                km2_rincian_pekerjaan: {
                  include: {
                    km2Pelaksanaan: {
                      include: { peran: true },
                    },
                    item_pengawasan: true,
                    kelompok_pengawasan: true,
                  },
                },
              },
            },
            km3: {
              include: {
                km3_rincian_pekerjaan: true,
                km3_peran: {
                  include: { peran: true },
                },
              },
            },
            km4: {
              include: {
                tujuan: {
                  include: {
                    program_kerja: {
                      include: {
                        auditors: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        pkpt: {
          include: {
            jenis_pengawasan: {
              include: {
                Kelompok_pengawasan: {
                  where: { deletedAt: null },
                  include: { Item_pengawasan: true },
                },
              },
            },
          },
        },
      },
    });

    if (!findId) {
      throw new BadRequestException(
        `Penugasan dengan Id ${id} tidak ditemukan`,
      );
    }

    return successResponse('Penugasan ditemukan', findId);
  }


  async update(id: number, data: UpdateJenisPenugasanDto) {

    return "ini update";
  }

  async remove(id: number) {
    const findId = await this.prisma.jenisPenugasan.findUnique({
      where: { id },
    });

    if (!findId) {
      throw new BadRequestException(
        `Penugasan dengan Id ${id} tidak ditemukan`,
      );
    }

    const q = await this.prisma.jenisPenugasan.delete({
      where: { id },
    });
    return successResponse('Penugasan berhasil dihapus', q);
  }
}
