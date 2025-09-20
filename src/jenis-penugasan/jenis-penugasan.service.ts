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

  // ===================== FIND ALL BY USER =====================

  // ===================== FIND ALL BY USER =====================
  async findAllByUser(
    nip: string,
    page: number,
    perPage: number,
    search?: string,
    orderBy?: string,
    order?: string,
    type: string = 'Ketua Tim', // default Ketua Tim
  ) {
    if (!nip) {
      throw new BadRequestException('NIP tidak ditemukan di token');
    }

    const skip = (page - 1) * perPage;
    const where: any = {
      Penugasan: {
        some: {
          susunan_tim: {
            some: {
              nip,
              peran: { nama: type },
            },
          },
        },
      },
    };

    if (search) {
      where.OR = [{ jenis_penugasan: { contains: search } }];
    }

    const [rawData, total] = await this.prisma.$transaction([
      this.prisma.jenisPenugasan.findMany({
        skip,
        take: perPage,
        where,
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
          status: true,
          createdByUser: true,
          updatedByUser: true,
          pkpt: true,
        },
        orderBy: {
          [orderBy ?? 'createdAt']: order,
        },
      }),
      this.prisma.jenisPenugasan.count({ where }),
    ]);

    const requiredRoles = [
      'Penanggung Jawab',
      'Pembantu Penanggung Jawab',
      'Pengendali Teknis',
      'Ketua Tim',
      'Anggota Tim',
    ];

    const data = rawData.map((item) => {
      const statusPenugasan: string[] = [];

      // Validasi Jenis Penugasan
      if (!item.jenis_penugasan?.trim()) statusPenugasan.push('Jenis penugasan belum diisi');
      if (!item.id_pkpt && !item.non_pkpt)
        statusPenugasan.push('Harus memilih PKPT / Non PKPT');

      const penugasan = item.Penugasan?.[0];
      if (!penugasan) {
        statusPenugasan.push('Penugasan belum terisi');
      } else {
        if (!penugasan.dasar_penugasan) statusPenugasan.push('Dasar penugasan belum diisi');
        if (!penugasan.sifat_penugasan) statusPenugasan.push('Sifat penugasan belum diisi');
        if (!penugasan.nama_penugasan) statusPenugasan.push('Nama penugasan belum diisi');
        if (!penugasan.alamat_penugasan) statusPenugasan.push('Alamat penugasan belum diisi');

        // ✅ Validasi rute perencanaan
        if (!penugasan.rute_perencanaan?.length) {
          statusPenugasan.push('Rute perencanaan belum diisi');
        }

        // ✅ Validasi susunan tim
        if (!penugasan.susunan_tim?.length) {
          statusPenugasan.push('Susunan tim belum diisi');
        } else {
          requiredRoles.forEach((role) => {
            if (
              !penugasan.susunan_tim.some(
                (s) => s.peran?.nama?.toLowerCase() === role.toLowerCase(),
              )
            ) {
              statusPenugasan.push(`Belum ada ${role}`);
            }
          });
        }

        // ✅ Validasi KM1–KM4
        if (!penugasan.km1?.length) {
          statusPenugasan.push('KM1 belum diisi');
        } else {
          penugasan.km1.forEach((km1) => statusPenugasan.push(...this.validateKM1(km1)));
        }

        if (!penugasan.km2?.length) {
          statusPenugasan.push('KM2 belum diisi');
        } else {
          penugasan.km2.forEach((km2) => statusPenugasan.push(...this.validateKM2(km2)));
        }

        if (!penugasan.km3?.length) {
          statusPenugasan.push('KM3 belum diisi');
        } else {
          penugasan.km3.forEach((km3) => statusPenugasan.push(...this.validateKM3(km3)));
        }

        if (!penugasan.km4?.length) {
          statusPenugasan.push('KM4 belum diisi');
        } else {
          penugasan.km4.forEach((km4) => statusPenugasan.push(...this.validateKM4(km4)));
        }
      }

      return {
        ...item,
        status_kekurangan: statusPenugasan.length ? statusPenugasan : ['Lengkap'],
      };
    });

    return successResponse(`Penugasan ${type} ditemukan`, {
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



  private validateKM1(km1: any) {
    const errors: string[] = [];
    if (!km1.rencana_penugasan) errors.push('KM1: Rencana penugasan belum diisi');
    if (!km1.tahun_penugasan_terakhir)
      errors.push('KM1: Tahun penugasan terakhir belum diisi');
    if (!km1.alamat) errors.push('KM1: Alamat belum diisi');
    if (!km1.tingkat_risiko) errors.push('KM1: Tingkat risiko belum diisi');
    if (!km1.tujuan_penugasan) errors.push('KM1: Tujuan penugasan belum diisi');
    if (!km1.surat_tugas_nomor) errors.push('KM1: Surat tugas nomor belum diisi');
    if (!km1.rencana_mulai) errors.push('KM1: Rencana mulai belum diisi');
    if (!km1.rencana_selesai) errors.push('KM1: Rencana selesai belum diisi');
    if (!km1.anggaran_diajukan) errors.push('KM1: Anggaran diajukan belum diisi');
    if (!km1.anggaran_disetujui) errors.push('KM1: Anggaran disetujui belum diisi');
    return errors;
  }

  private validateKM2(km2: any) {
    const errors: string[] = [];
    if (!km2.sasaran_penugasan) errors.push('KM2: Sasaran penugasan belum diisi');

    km2.km2_rincian_pekerjaan?.forEach((rp) => {
      if (!rp.id_kelompok_pengawasan)
        errors.push('KM2: Kelompok pengawasan belum diisi');
      if (!rp.id_item_pengawasan) errors.push('KM2: Item pengawasan belum diisi');
      if (!rp.tanggal) errors.push('KM2: Tanggal belum diisi');
      if (!rp.anggaran_waktu) errors.push('KM2: Anggaran waktu belum diisi');
      if (!rp.km2Pelaksanaan?.length) errors.push('KM2: Pelaksana belum diisi');
    });

    return errors;
  }

  private validateKM3(km3: any) {
    const errors: string[] = [];
    if (!km3.km3_rincian_pekerjaan?.length)
      errors.push('KM3: Rincian pekerjaan belum diisi');

    km3.km3_peran?.forEach((p) => {
      if (!p.rencana_jam)
        errors.push(`KM3: Rencana jam belum diisi (${p.peran?.nama})`);
      if (!p.realisasi_jam)
        errors.push(`KM3: Realisasi jam belum diisi (${p.peran?.nama})`);
    });

    return errors;
  }

  private validateKM4(km4: any) {
    const errors: string[] = [];
    if (!km4.tujuan?.length) errors.push('KM4: Tujuan belum diisi');

    km4.tujuan?.forEach((t) => {
      if (!t.deskripsi) errors.push('KM4: Deskripsi tujuan belum diisi');

      t.program_kerja?.forEach((pk) => {
        if (!pk.prosedur) errors.push('KM4: Prosedur belum diisi');
        if (!pk.anggaran_waktu) errors.push('KM4: Anggaran waktu belum diisi');
        if (!pk.realisasi_waktu) errors.push('KM4: Realisasi waktu belum diisi');
        if (!pk.no_kka) errors.push('KM4: Nomor KKA belum diisi');
        if (!pk.auditors?.length) errors.push('KM4: Auditor belum diisi');
      });
    });

    return errors;
  }

}
