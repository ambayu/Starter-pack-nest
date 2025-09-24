import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJenisPenugasanDto } from './dto/create-jenis-penugasan.dto';
import { UpdateJenisPenugasanDto } from './dto/update-jenis-penugasan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';
import PDFDocument = require('pdfkit');
import path = require('path');
import * as fs from 'fs';

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

  async changeStatus_JenisPenugasaan(id: number, id_status: number) {
    const findId = await this.prisma.jenisPenugasan.findUnique({ where: { id } });
    if (!findId) {
      throw new BadRequestException(`Penugasan dengan Id ${id} tidak ditemukan`);
    }

    const findStatus = await this.prisma.status.findUnique({
      where: { id: id_status },
    });
    if (!findStatus) {
      throw new BadRequestException(`Status dengan Id ${id_status} tidak ditemukan`);
    }


    const q = await this.prisma.jenisPenugasan.update({
      where: { id },
      data: { id_status: id_status },
    });

    const q2 = await this.prisma.penugasan.updateMany({ where: { id_jenis_penugasan: id }, data: { alasan_penolakan: "" } })

    return successResponse('Status berhasil diubah', q);
  }

  async penomoran(id: number, nomor_penugasan: string) {
    const findId = await this.prisma.penugasan.findUnique({ where: { id } });
    if (!findId) {
      throw new BadRequestException(`Penugasan dengan Id ${id} tidak ditemukan`);
    }

    const q = await this.prisma.penugasan.update({
      where: { id },
      data: { nomor_penugasan: nomor_penugasan },
    });

    const q2 = await this.prisma.jenisPenugasan.update({
      where: { id: findId.id_jenis_penugasan },
      data: { id_status: 8 },
    })
    return successResponse('Penomoran berhasil ditambahkan', q);
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
              rute_perencanaan: true,
              km1: true,
              km2: true,
              km3: true,
            },
          },
          status: true,
          createdByUser: true,
          updatedByUser: true,
          pkpt: true,
        },
        orderBy: {
          [orderBy ? orderBy : "createdAt"]: order,
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
      let statusTTD: string[] = [];

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

        // === Susunan tim wajib ada ===
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

        // === Validasi Penandatanganan (TTD) hanya kalau id_status = 4 ===
        if (item.id_status >= 4) {
          if (penugasan.km1?.length) {
            const km1 = penugasan.km1[0];
            if (!km1.tgl_ttd_katim)
              statusTTD.push("KM1 Ketua Tim belum tanda tangan");
            if (!km1.tgl_ttd_pt)
              statusTTD.push("KM1 Pengendali Teknis belum tanda tangan");
            if (!km1.tgl_ttd_ppj)
              statusTTD.push("KM1 PPJ belum tanda tangan");
          }

          if (penugasan.km2?.length) {
            const km2 = penugasan.km2[0];
            if (!km2.tgl_ttd_kasubag_umum)
              statusTTD.push("KM2 Kasubag Umum belum tanda tangan");
            if (!km2.tgl_ttd_ppj)
              statusTTD.push("KM2 PPJ belum tanda tangan");
            if (!km2.tgl_ttd_sekretaris)
              statusTTD.push("KM2 Sekretaris belum tanda tangan");
          }

          if (penugasan.km3?.length) {
            const km3 = penugasan.km3[0];
            if (!km3.tgl_ttd_katim)
              statusTTD.push("KM3 Ketua Tim belum tanda tangan");
            if (!km3.tgl_ttd_pt)
              statusTTD.push("KM3 Pengendali Teknis belum tanda tangan");
          }
        }
      }

      return {
        ...item,
        status_kekurangan: statusList.length > 0 ? statusList : ["Lengkap"],
        status_penandatanganan:
          item.id_status >= 4
            ? statusTTD.length > 0
              ? statusTTD
              : ["Semua sudah ditandatangani"]
            : [],
      };
    });

    return successResponse("Penugasan ditemukan", {
      data,
      total,
      page,
      perPage,
    });
  }

  async findAllUserPenandatanganan(
    userId: number,
    page: number,
    perPage: number,
    search?: string,
    orderBy?: string,
    order?: string,
  ) {
    if (!userId) throw new BadRequestException('User ID tidak ditemukan di token');
    const skip = (page - 1) * perPage;

    const where: any = {
      OR: [
        {
          Penugasan: {
            some: {
              km1: {
                some: {
                  OR: [
                    { ttd_katim: userId },
                    { ttd_ppj: userId },
                    { ttd_pt: userId },
                  ],
                },
              },
            },
          },
        },
        {
          Penugasan: {
            some: {
              km2: {
                some: {
                  OR: [
                    { ttd_kasubag_umum: userId },
                    { ttd_ppj: userId },
                    { ttd_sekretaris: userId },
                  ],
                },
              },
            },
          },
        },
        {
          Penugasan: {
            some: {
              km3: {
                some: {
                  OR: [
                    { ttd_katim: userId },
                    { ttd_pt: userId },
                  ],
                },
              },
            },
          },
        },
      ],
    };

    if (search) {
      where.OR.push({ jenis_penugasan: { contains: search } });
    }

    where.id_status = { gt: 2 };

    const [rawData, total] = await this.prisma.$transaction([
      this.prisma.jenisPenugasan.findMany({
        skip,
        take: perPage,
        where,
        include: {
          Penugasan: {
            take: 1,
            orderBy: { createdAt: 'desc' },
            include: {
              km1: true,
              km2: true,
              km3: true,
            },
          },
          status: true,
          createdByUser: true,
          updatedByUser: true,
        },
        orderBy: {
          [orderBy ?? 'createdAt']: order,
        },
      }),
      this.prisma.jenisPenugasan.count({ where }),
    ]);

    const data = rawData.map((item) => {
      const penugasan = item.Penugasan?.[0];
      const statusPenandatangan: string[] = [];
      const statusKekurangan: string[] = [];

      // KM1
      penugasan?.km1?.forEach((km1) => {
        if (km1.ttd_katim === userId) {
          statusPenandatangan.push('KM1: Ketua Tim');
          if (!km1.tgl_ttd_katim) statusKekurangan.push('KM1: Ketua Tim');
        }
        if (km1.ttd_ppj === userId) {
          statusPenandatangan.push('KM1: Penanggung Jawab');
          if (!km1.tgl_ttd_ppj) statusKekurangan.push('KM1: Penanggung Jawab');
        }
        if (km1.ttd_pt === userId) {
          statusPenandatangan.push('KM1: Pengendali Teknis');
          if (!km1.tgl_ttd_pt) statusKekurangan.push('KM1: Pengendali Teknis');
        }
      });

      // KM2
      penugasan?.km2?.forEach((km2) => {
        if (km2.ttd_kasubag_umum === userId) {
          statusPenandatangan.push('KM2: Kasubag Umum');
          if (!km2.tgl_ttd_kasubag_umum) statusKekurangan.push('KM2: Kasubag Umum');
        }
        if (km2.ttd_ppj === userId) {
          statusPenandatangan.push('KM2: Penanggung Jawab');
          if (!km2.tgl_ttd_ppj) statusKekurangan.push('KM2: Penanggung Jawab');
        }
        if (km2.ttd_sekretaris === userId) {
          statusPenandatangan.push('KM2: Sekretaris');
          if (!km2.tgl_ttd_sekretaris) statusKekurangan.push('KM2: Sekretaris');
        }
      });

      // KM3
      penugasan?.km3?.forEach((km3) => {
        if (km3.ttd_katim === userId) {
          statusPenandatangan.push('KM3: Ketua Tim');
          if (!km3.tgl_ttd_katim) statusKekurangan.push('KM3: Ketua Tim');
        }
        if (km3.ttd_pt === userId) {
          statusPenandatangan.push('KM3: Pengendali Teknis');
          if (!km3.tgl_ttd_pt) statusKekurangan.push('KM3: Pengendali Teknis');
        }
      });

      return {
        ...item,
        status_penandatangan: statusPenandatangan.length
          ? statusPenandatangan
          : ['Bukan penandatangan'],
        status_kekurangan: statusKekurangan.length
          ? statusKekurangan
          : ['Tidak ada kekurangan'],
      };
    });

    return successResponse('Daftar penandatanganan ditemukan', {
      data,
      total,
      page,
      perPage,
    });
  }


  async findAllByUser(
    nip: string,
    page: number,
    perPage: number,
    search?: string,
    orderBy?: string,
    order?: string,
    type: string = 'Ketua Tim',
  ) {
    if (!nip) throw new BadRequestException('NIP tidak ditemukan di token');

    const skip = (page - 1) * perPage;

    // filter dasar
    const where: any = {
      Penugasan: {
        some: {
          susunan_tim: {
            some: { nip, peran: { nama: type } },
          },
        },
      }, id_status: { gt: 1 },
    };

    // search
    if (search) {
      where.OR = [
        { jenis_penugasan: { contains: search } },
        { Penugasan: { some: { nama_penugasan: { contains: search } } } },
      ];
    }



    const [rawData, total] = await this.prisma.$transaction([
      this.prisma.jenisPenugasan.findMany({
        skip,
        take: perPage,
        where,
        include: {
          Penugasan: {
            take: 1,
            orderBy: { createdAt: 'desc' },
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
                  KM4ProgramKerja: { include: { auditors: true } },
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

    // role yang wajib ada
    const requiredRoles = [
      'Penanggung Jawab',
      'Pembantu Penanggung Jawab',
      'Pengendali Teknis',
      'Ketua Tim',
      'Anggota Tim',
    ];

    const data = rawData.map((item) => {
      const statusPenugasan: string[] = [];

      if (!item.jenis_penugasan?.trim()) statusPenugasan.push('Jenis penugasan belum diisi');
      if (!item.id_pkpt && !item.non_pkpt) statusPenugasan.push('Harus memilih PKPT / Non PKPT');

      const penugasan = item.Penugasan?.[0];
      if (!penugasan) {
        statusPenugasan.push('Penugasan belum terisi');
      } else {
        if (!penugasan.dasar_penugasan) statusPenugasan.push('Dasar penugasan belum diisi');
        if (!penugasan.sifat_penugasan) statusPenugasan.push('Sifat penugasan belum diisi');
        if (!penugasan.nama_penugasan) statusPenugasan.push('Nama penugasan belum diisi');
        if (!penugasan.alamat_penugasan) statusPenugasan.push('Alamat penugasan belum diisi');

        if (!penugasan.rute_perencanaan?.length) statusPenugasan.push('Rute perencanaan belum diisi');

        if (!penugasan.susunan_tim?.length) {
          statusPenugasan.push('Susunan tim belum diisi');
        } else {
          requiredRoles.forEach((role) => {
            if (!penugasan.susunan_tim.some((s) => s.peran?.nama?.toLowerCase() === role.toLowerCase())) {
              statusPenugasan.push(`Belum ada ${role}`);
            }
          });
        }

        if (!penugasan.km1?.length) statusPenugasan.push('KM1 belum diisi');
        else penugasan.km1.forEach((km1) => statusPenugasan.push(...(this.validateKM1(km1) || [])));

        if (!penugasan.km2?.length) statusPenugasan.push('KM2 belum diisi');
        else penugasan.km2.forEach((km2) => statusPenugasan.push(...(this.validateKM2(km2) || [])));

        if (!penugasan.km3?.length) statusPenugasan.push('KM3 belum diisi');
        else penugasan.km3.forEach((km3) => statusPenugasan.push(...(this.validateKM3(km3) || [])));

        if (!penugasan.km4?.length) statusPenugasan.push('KM4 belum diisi');
        else penugasan.km4.forEach((km4) => statusPenugasan.push(...(this.validateKM4(km4) || [])));
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

  async approve_ttd(
    type: 'km1' | 'km2' | 'km3' | 'km4',
    id: number,
    ttd: string,
    userId: number,
  ) {
    let updateData: any = {};
    let model: any;
    switch (type) {
      case 'km1':
        model = this.prisma.kM1;
        if (ttd === 'katim') updateData = { tgl_ttd_katim: new Date() };
        if (ttd === 'ppj') updateData = { tgl_ttd_ppj: new Date() };
        if (ttd === 'pt') updateData = { tgl_ttd_pt: new Date() };
        break;

      case 'km2':
        model = this.prisma.kM2;
        if (ttd === 'kasubag_umum') updateData = { tgl_ttd_kasubag_umum: new Date() };
        if (ttd === 'ppj') updateData = { tgl_ttd_ppj: new Date() };
        if (ttd === 'sekretaris') updateData = { tgl_ttd_sekretaris: new Date() };
        break;

      case 'km3':
        model = this.prisma.kM3;
        if (ttd === 'katim') updateData = { tgl_ttd_katim: new Date() };
        if (ttd === 'pt') updateData = { tgl_ttd_pt: new Date() };
        break;

      case 'km4':
        model = this.prisma.kM4;
        if (ttd === 'katim') updateData = { tgl_ttd_katim: new Date() };
        if (ttd === 'pt') updateData = { tgl_ttd_pt: new Date() };
        if (ttd === 'ppj') updateData = { tgl_ttd_ppj: new Date() };
        break;

      default:
        throw new Error(`Type ${type} tidak dikenali`);
    }

    if (!Object.keys(updateData).length) {
      throw new Error(`Role TTD ${ttd} tidak valid untuk ${type}`);
    }

    return model.update({
      where: { id },
      data: updateData,
    });
  }

  async reject_ttd(
    type: 'km1' | 'km2' | 'km3' | 'km4',
    id: number,
    ttd: string,
    alasan: string,
  ) {
    let updateData: any = {};
    let model: any;

    switch (type) {
      case 'km1':
        model = this.prisma.kM1;
        if (ttd === 'katim') updateData = { tgl_ttd_katim: null };
        if (ttd === 'ppj') updateData = { tgl_ttd_ppj: null };
        if (ttd === 'pt') updateData = { tgl_ttd_pt: null };
        break;

      case 'km2':
        model = this.prisma.kM2;
        if (ttd === 'kasubag_umum') updateData = { tgl_ttd_kasubag_umum: null };
        if (ttd === 'ppj') updateData = { tgl_ttd_ppj: null };
        if (ttd === 'sekretaris') updateData = { tgl_ttd_sekretaris: null };
        break;

      case 'km3':
        model = this.prisma.kM3;
        if (ttd === 'katim') updateData = { tgl_ttd_katim: null };
        if (ttd === 'pt') updateData = { tgl_ttd_pt: null };
        break;

      case 'km4':
        model = this.prisma.kM4;
        if (ttd === 'katim') updateData = { tgl_ttd_katim: null };
        if (ttd === 'pt') updateData = { tgl_ttd_pt: null };
        if (ttd === 'ppj') updateData = { tgl_ttd_ppj: null };
        break;

      default:
        throw new Error(`Type ${type} tidak dikenali`);
    }

    if (!Object.keys(updateData).length) {
      throw new Error(`Role TTD ${ttd} tidak valid untuk ${type}`);
    }

    // update model sesuai type
    const updated = await model.update({
      where: { id },
      data: updateData,
      include: { penugasan: true },
    });

    // reset status penugasan dan simpan alasan
    const data = await this.prisma.penugasan.update({
      where: { id: updated.id_penugasan },
      data: {
        id_status_penugasan: 1,
        alasan_penolakan: alasan,
      },
    });
    return updated;
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
            km1: {
              include: {
                ttd_katim_user: true,
                ttd_ppj_user: true,
                ttd_pt_user: true,
              }
            },
            km2: {
              include: {
                ttd_kasubag_umum_user: true,
                ttd_ppj_user: true,
                ttd_sekretaris_user: true,


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
                ttd_katim_user: true,
                ttd_pt_user: true,

                km3_rincian_pekerjaan: {
                  include: {
                    item_pengawasan: true,
                    kelompok_pengawasan: true,
                  }
                },
                km3_peran: { include: { peran: true } },
              },
            },
            km4: {
              include: {
                KM4ProgramKerja: {
                  include: {
                    auditors: true,
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

  async reject_penugasan(id: number, alasan) {
    const findId = await this.prisma.penugasan.findUnique({ where: { id } });
    if (!findId) {
      throw new BadRequestException(`Penugasan dengan Id ${id} tidak ditemukan`);
    }
    const q = await this.prisma.penugasan.update({
      where: { id },
      data: { id_status_penugasan: 1, alasan_penolakan: alasan },
    });

    await this.prisma.jenisPenugasan.update({
      where: { id: findId.id_jenis_penugasan },
      data: { id_status: 6 },
    })


    return successResponse('Penugasan berhasil diubah', q);

  }

  async approve_penugasan(id: number, id_status: number) {
    const findId = await this.prisma.penugasan.findUnique({ where: { id } });
    if (!findId) {
      throw new BadRequestException(`Penugasan dengan Id ${id} tidak ditemukan`);
    }

    const q = await this.prisma.jenisPenugasan.update({
      where: { id: findId.id_jenis_penugasan },
      data: { id_status: id_status },
    })

    return successResponse('Penugasan berhasil diapprove', q);

  }


  private validateKM1(km1: any) {
    const errors: string[] = [];
    if (!km1.rencana_penugasan) errors.push('KM1: Rencana penugasan belum diisi');
    if (!km1.tahun_penugasan_terakhir)
      errors.push('KM1: Tahun penugasan terakhir belum diisi');
    if (!km1.alamat) errors.push('KM1: Alamat belum diisi');
    if (!km1.tingkat_risiko) errors.push('KM1: Tingkat risiko belum diisi');
    if (!km1.tujuan_penugasan) errors.push('KM1: Tujuan penugasan belum diisi');
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
      if (!rp.tanggal_awal) errors.push('KM2: Tanggal awal belum diisi');
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


  async generatePdf(id: number): Promise<Buffer> {
    const penugasan = await this.prisma.penugasan.findUnique({
      where: { id },
      include: {
        jenis_penugasan: true,
        createdByUser: true,
        susunan_tim: { include: { peran: true, user: true } },
        km1: { include: { ttd_ppj_user: { include: { Biodata: true } } } },
      },
    });

    if (!penugasan) {
      throw new BadRequestException(`Penugasan ${id} tidak ditemukan`);
    }

    const cm = (val: number) => val * 28.35;
    const pageWidth = 595; // A4 width
    const pageHeight = 842; // A4 height

    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: cm(1), bottom: cm(0), left: cm(3), right: cm(2) },
    });

    const chunks: Buffer[] = [];
    doc.on('data', (c) => chunks.push(c));

    // === Register font ===
    const fontRegular = path.join(process.cwd(), 'public', 'fonts', 'arial.ttf');
    const fontBold = path.join(process.cwd(), 'public', 'fonts', 'arialbd.ttf');

    if (fs.existsSync(fontRegular)) doc.registerFont('Arial', fontRegular);
    if (fs.existsSync(fontBold)) doc.registerFont('Arial-Bold', fontBold);

    const contentWidth = pageWidth - cm(3) - cm(2);
    const contentLeft = cm(3);
    const contentRight = pageWidth - cm(2);

    // === Header ===
    const logoPath = path.join(process.cwd(), 'public', 'assets', 'logo.png');
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, contentLeft, cm(0.5), {
        width: cm(1.57),
        height: cm(1.9),
      });
    }

    doc.font('Arial-Bold').fontSize(12)
      .text('PEMERINTAH KOTA MEDAN', contentLeft, cm(0.5), { width: contentWidth, align: 'center' });

    doc.font('Arial-Bold').fontSize(16)
      .text('INSPEKTORAT', contentLeft, doc.y, { width: contentWidth, align: 'center' });

    doc.font('Arial').fontSize(9)
      .text('Jalan Kapten Maulana Lubis Nomor 2, Medan Petisah, Medan, Sumatera Utara, 20112',
        contentLeft, doc.y, { width: contentWidth, align: 'center' })
      .text('Laman inspektorat.medan.go.id, Pos-el inspektorat@medan.go.id',
        contentLeft, doc.y, { width: contentWidth, align: 'center' });

    const lineY = doc.y + 5;
    doc.moveTo(contentLeft, lineY).lineTo(contentRight, lineY).lineWidth(1).stroke();
    doc.y = lineY + 15;

    // === Judul Surat ===
    doc.font('Arial-Bold').fontSize(14)
      .text('SURAT TUGAS', contentLeft, doc.y, { width: contentWidth, align: 'center' });

    doc.moveDown(0.2);

    doc.font('Arial').fontSize(12)
      .text(`NOMOR ${penugasan.nomor_penugasan || '....'} /INSP/2025`,
        contentLeft, doc.y, { width: contentWidth, align: 'center' });

    doc.moveDown(1);

    // === Dasar === (Format List Rapi)
    doc.font('Arial-Bold').fontSize(12).text('Dasar', contentLeft, doc.y, { continued: true });
    doc.font('Arial').text(' :');
    doc.moveDown(0.3);

    const dasarList = [
      'Peraturan Pemerintah Nomor 60 Tahun 2008 tentang Sistem Pengendalian Intern Pemerintah;',
      'Peraturan Menteri Dalam Negeri Nomor 2 Tahun 2025 tentang Perencanaan Pembinaan dan Pengawasan Penyelenggaraan Pemerintahan Daerah Tahun 2025; dan',
      'Peraturan Wali Kota Medan Nomor 29 Tahun 2023 tentang Rincian Tugas dan Fungsi Inspektorat Kota Medan;',
    ];

    const listLeft = contentLeft + cm(0.5);
    const numberWidth = cm(0.8);
    const textWidth = contentWidth - cm(0.5) - numberWidth;

    dasarList.forEach((item, index) => {
      const currentY = doc.y;

      // Nomor (1., 2., 3.)
      doc.font('Arial').fontSize(12)
        .text(`${index + 1}.`, listLeft, currentY, {
          width: numberWidth,
          align: 'left'
        });

      // Teks setelah nomor
      doc.font('Arial').fontSize(12)
        .text(item, listLeft + numberWidth, currentY, {
          width: textWidth,
          align: 'justify'
        });

      doc.moveDown(0.3);
    });

    doc.moveDown(1);

    // === MEMERINTAHKAN ===
    doc.font('Arial-Bold').fontSize(12)
      .text('MEMERINTAHKAN:', contentLeft, doc.y, { width: contentWidth, align: 'center' });

    doc.moveDown(1);

    // === Tabel Susunan Tim ===
    const tableTop = doc.y;
    const colWidths = [cm(1), cm(7), cm(6), cm(2)];

    const headers = ['No.', 'Nama', 'Jabatan dalam Tim', 'Waktu'];
    const rows = penugasan.susunan_tim.map((st, i) => [
      `${i + 1}`,
      st.user?.name || '-',
      st.peran?.nama || '-',
      `${penugasan.km1?.[0]?.jumlah_hari || '-'} Hari`,
    ]);

    const allRows = [headers, ...rows];
    const rowHeight = 25;

    allRows.forEach((row, rowIndex) => {
      let x = contentLeft;
      let maxHeight = rowHeight;

      row.forEach((cell, i) => {
        const opts = { width: colWidths[i], align: 'left' as const };
        const h = doc.heightOfString(cell, { ...opts });
        if (h + 10 > maxHeight) maxHeight = h + 10;
      });

      let y = tableTop + rowIndex * maxHeight;
      row.forEach((cell, i) => {
        doc.rect(x, y, colWidths[i], maxHeight).stroke();
        doc.font(rowIndex === 0 ? 'Arial-Bold' : 'Arial')
          .fontSize(11)
          .text(cell, x + 5, y + 5, { width: colWidths[i] - 10, align: 'left' });
        x += colWidths[i];
      });
      doc.y = y + maxHeight;
    });

    doc.moveDown(1);

    // === Untuk === (Format List Rapi)
    doc.font('Arial-Bold').fontSize(12).text('Untuk', contentLeft, doc.y, { continued: true });
    doc.font('Arial').text(' :');
    doc.moveDown(0.3);

    const untukList = [
      'melakukan Evaluasi Manajemen Resiko pada Dinas Sumber Daya Air, Bina Marga dan Bina Konstruksi, Dinas Ketahanan Pangan, Pertanian dan Perikanan, Dinas Lingkungan Hidup, dan Badan Kepegawaian dan Pengembangan Sumber Daya Manusia Kota Medan;',
      `melaksanakan tugas selama ${penugasan.km1?.[0]?.jumlah_hari || '-'} hari mulai tanggal 20 Juni s.d. 2 Juli 2025; dan`,
      'menyampaikan laporan hasil pelaksanaan penugasan setelah berakhirnya masa Surat Tugas.',
    ];

    untukList.forEach((item, index) => {
      const currentY = doc.y;

      // Nomor (1., 2., 3.)
      doc.font('Arial').fontSize(12)
        .text(`${index + 1}.`, listLeft, currentY, {
          width: numberWidth,
          align: 'left'
        });

      // Teks setelah nomor
      doc.font('Arial').fontSize(12)
        .text(item, listLeft + numberWidth, currentY, {
          width: textWidth,
          align: 'justify'
        });

      doc.moveDown(0.3);
    });

    doc.moveDown(2);

    // === Tanda Tangan (Rata Tengah Tapi di Sebelah Kanan) ===
    const pejabat = penugasan.km1?.[0]?.ttd_ppj_user;
    const biodata = pejabat?.Biodata;

    // Buat area tanda tangan di sebelah kanan dengan lebar tertentu
    const signatureWidth = cm(8); // Lebar area tanda tangan
    const signatureLeft = contentRight - signatureWidth; // Posisi mulai dari kanan

    // Tanggal rata kanan dalam area tanda tangan
    doc.font('Arial').fontSize(12)
      .text(`Medan, Juni 2025`, signatureLeft, doc.y, {
        width: signatureWidth,
        align: 'right'
      });

    doc.moveDown(0.5);

    // Jabatan rata tengah dalam area tanda tangan
    doc.font('Arial').fontSize(12)
      .text(`Plt. Inspektur,`, signatureLeft, doc.y, {
        width: signatureWidth,
        align: 'center'
      });

    doc.moveDown(3); // Jarak untuk tanda tangan

    // Nama Pejabat rata tengah
    doc.font('Arial-Bold').fontSize(12)
      .text(pejabat?.name || '........................', signatureLeft, doc.y, {
        width: signatureWidth,
        align: 'center'
      });

    // Pangkat rata tengah
    if (biodata?.pangkat) {
      doc.font('Arial').fontSize(11)
        .text(biodata.pangkat, signatureLeft, doc.y, {
          width: signatureWidth,
          align: 'center'
        });
    }

    // === NIP rata tengah
    doc.font('Arial').fontSize(11)
      .text(`NIP ${pejabat?.nip || ''}`, signatureLeft, doc.y, {
        width: signatureWidth,
        align: 'center'
      });

    // === Footer (Tambahan) ===
    doc.moveDown(4); // kasih jarak dari tanda tangan
    doc.font('Arial').fontSize(10).text(
      'Pegawai Inspektorat dalam bertugas wajib memedomani Undang-Undang Nomor 20 Tahun 2023 ' +
      'tentang ASN, Pasal 24 ayat (1) huruf c yang menyatakan Pegawai ASN wajib:\n' +
      '“melaksanakan nilai dasar ASN dan kode etik dan kode perilaku ASN”.',
      contentLeft, doc.y,
      { width: contentWidth, align: 'center' }
    );

    doc.end();

    return new Promise<Buffer>((resolve, reject) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);
    });
  }

  private validateKM4(km4: any) {
    const errors: string[] = [];

    // tujuan wajib ada (string, bukan array)
    if (!km4.tujuan || km4.tujuan.trim() === '') {
      errors.push('KM4: Tujuan belum diisi');
    }

    // Validasi program kerja
    km4.KM4ProgramKerja?.forEach((pk) => {
      if (!pk.prosedur) errors.push('KM4: Prosedur belum diisi');
      if (!pk.anggaran_waktu) errors.push('KM4: Anggaran waktu belum diisi');
      if (!pk.realisasi_waktu) errors.push('KM4: Realisasi waktu belum diisi');
      if (!pk.no_kka) errors.push('KM4: Nomor KKA belum diisi');
      if (!pk.auditors?.length) errors.push('KM4: Auditor belum diisi');
    });

    return errors;
  }




}
