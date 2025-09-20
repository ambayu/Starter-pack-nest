import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJenisPenugasanDto } from './dto/create-jenis-penugasan.dto';
import { UpdateJenisPenugasanDto } from './dto/update-jenis-penugasan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';
import { find } from 'rxjs';

@Injectable()
export class JenisPenugasanService {
  constructor(private prisma: PrismaService) { }

  // CREATE / UPSERT
  async create(data: CreateJenisPenugasanDto & { createdBy: number }) {
    const q = await this.prisma.jenisPenugasan.upsert({
      where: { id: data.id ?? 0 }, // kalau id ada → update, kalau tidak → create
      update: {
        jenis_penugasan: data.jenis_penugasan,
        id_pkpt: data.id_pkpt ?? null,
        non_pkpt: data.non_pkpt,
        updatedBy: data.createdBy,
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
                updatedBy: data.createdBy,
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
                createdBy: data.createdBy,
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
        createdBy: data.createdBy,
        Penugasan: data.Penugasan
          ? {
            create: {
              dasar_penugasan: data.Penugasan.dasar_penugasan ?? '',
              sifat_penugasan: data.Penugasan.sifat_penugasan ?? '',
              nama_penugasan: data.Penugasan.nama_penugasan ?? '',
              alamat_penugasan: data.Penugasan.alamat_penugasan ?? '',
              catatan: data.Penugasan.catatan ?? '',
              createdBy: data.createdBy,
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

  async changeStatus(id: number,) {
    const findId = await this.prisma.jenisPenugasan.findUnique({ where: { id } });
    if (!findId) {
      throw new BadRequestException(`Penugasan dengan Id ${id} tidak ditemukan`);
    }

    const q = await this.prisma.jenisPenugasan.update({
      where: { id },
      data: { id_status: 2 },
    });
    return successResponse('Status berhasil diubah', q);
  }
  // FIND ALL
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

    const [rawData, total] = await this.prisma.$transaction([
      this.prisma.jenisPenugasan.findMany({
        skip,
        take: perPage,
        include: {
          Penugasan: {
            include: {
              susunan_tim: { include: { peran: true, user: true } },
              rute_perencanaan: true, // tetap diambil, tapi tidak divalidasi
            },
          },
          status: true,
          createdByUser: true,
          updatedByUser: true,
          pkpt: true,
        },
        orderBy: {
          [orderBy ? orderBy : 'createdAt']: order,
        },
      }),
      this.prisma.jenisPenugasan.count({ where }),
    ]);

    // ➡️ Role wajib di susunan tim
    const requiredRoles = [
      "Penanggung Jawab",
      "Pembantu Penanggung Jawab",
      "Pengendali Teknis",
      "Ketua Tim",
      "Anggota Tim",
    ];

    const data = rawData.map((item) => {
      const statusList: string[] = [];

      // ====== Validasi JenisPenugasan ======
      if (!item.jenis_penugasan || item.jenis_penugasan.trim() === "") {
        statusList.push("Jenis penugasan belum diisi");
      }

      if (!item.id_pkpt && !item.non_pkpt) {
        statusList.push("Jenis penugasan harus memilih PKPT / Non PKPT");
      }

      // ====== Validasi Penugasan ======
      if (!item.Penugasan || item.Penugasan.length === 0) {
        statusList.push("Penugasan belum terisi");
      } else {
        const penugasan = item.Penugasan[0];

        if (!penugasan.dasar_penugasan) {
          statusList.push("Dasar penugasan belum diisi");
        }
        if (!penugasan.sifat_penugasan) {
          statusList.push("Sifat penugasan belum diisi");
        }
        if (!penugasan.nama_penugasan) {
          statusList.push("Nama penugasan belum diisi");
        }
        if (!penugasan.alamat_penugasan) {
          statusList.push("Alamat penugasan belum diisi");
        }

        // Susunan tim wajib ada
        if (!penugasan.susunan_tim || penugasan.susunan_tim.length === 0) {
          statusList.push("Susunan tim belum diisi");
        } else {
          requiredRoles.forEach((role) => {
            const hasRole = penugasan.susunan_tim?.some(
              (s) => s.peran?.nama?.toLowerCase() === role.toLowerCase()
            );
            if (!hasRole) {
              statusList.push(`Belum ada ${role}`);
            }
          });
        }

      }

      return {
        ...item,
        status_kekurangan: statusList.length > 0 ? statusList : ["Lengkap"],
      };
    });

    return successResponse("Penugasan ditemukan", {
      data,
      total,
      page,
      perPage,
    });
  }


  // FIND ONE
  async findOne(id: number) {
    const findId = await this.prisma.jenisPenugasan.findUnique({
      where: { id },
      include: {
        Penugasan: {
          include: {
            rute_perencanaan: true,
            susunan_tim: { include: { peran: true, user: true } },
            km1: true,
            km2: {
              include: {
                km2_rincian_pekerjaan: {
                  include: {
                    km2Pelaksanaan: { include: { peran: true } },
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
                    program_kerja: { include: { auditors: true } },
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
      throw new BadRequestException(`Penugasan dengan Id ${id} tidak ditemukan`);
    }

    return successResponse('Penugasan ditemukan', findId);
  }

  // UPDATE
  async update(id: number, data: UpdateJenisPenugasanDto) {
    return 'ini update';
  }

  // REMOVE
  async remove(id: number) {
    const findId = await this.prisma.jenisPenugasan.findUnique({ where: { id } });
    if (!findId) {
      throw new BadRequestException(`Penugasan dengan Id ${id} tidak ditemukan`);
    }

    const q = await this.prisma.jenisPenugasan.delete({ where: { id } });
    return successResponse('Penugasan berhasil dihapus', q);
  }
}
