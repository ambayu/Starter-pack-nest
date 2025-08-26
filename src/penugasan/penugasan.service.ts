import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePenugasanDto } from './dto/create-penugasan.dto';
import { UpdatePenugasanDto } from './dto/update-penugasan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class PenugasanService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreatePenugasanDto) {
    const q = await this.prisma.penugasan.create({
      data: {
        dasar_penugasan: data.dasar_penugasan,
        sifat_penugasan: data.sifat_penugasan,
        nama_penugasan: data.nama_penugasan,
        alamat_penugasan: data.alamat_penugasan,
        nomor_kartu: data.nomor_kartu,
        penanggung_jawab: data.penanggung_jawab,
        pembantu_penanggung_jawab: data.pembantu_penanggung_jawab,
        pengendali_teknis: data.pengendali_teknis,
        ketua_tim: data.ketua_tim,
        catatan: data.catatan,
        createdBy: data.createdBy,
        updatedBy: data.updatedBy ?? data.createdBy,

        // RUTE PERENCANAAN
        rute_perencanaan: data.rute_perencanaan
          ? {
              create: data.rute_perencanaan.map((r) => ({
                no_urutan: r.no_urutan,
                uraian_pekerjaan: r.uraian_pekerjaan,
                nama_penangggung: r.nama_penangggung,
                nip: r.nip,
                tanggal_paraf: r.tanggal_paraf,
              })),
            }
          : undefined,

        // KM1
        km1: data.km1
          ? {
              create: data.km1.map((k) => ({
                rencana_penugasan: k.rencana_penugasan,
                tahun_penugasan_terakhir: k.tahun_penugasan_terakhir,
                alamat: k.alamat,
                tingkat_risiko: k.tingkat_risiko,
                tujuan_penugasan: k.tujuan_penugasan,
                surat_tugas_nomor: k.surat_tugas_nomor,
                rencana_mulai: k.rencana_mulai,
                rencana_selesai: k.rencana_selesai,
                anggaran_diajukan: k.anggaran_diajukan,
                anggaran_disetujui: k.anggaran_disetujui,
                catatan_penting: k.catatan_penting,
                KM1SusunanTim: k.KM1SusunanTim
                  ? {
                      create: k.KM1SusunanTim.map((s) => ({
                        nip: s.nip,
                        id_peran: s.id_peran,
                        satuan: s.satuan,
                        honorarium: s.honorarium,
                        alokasi_anggaran: s.alokasi_anggaran,
                      })),
                    }
                  : undefined,
              })),
            }
          : undefined,

 // KM2
        km2: data.km2
          ? {
              create: data.km2.map((k2) => ({
                sasaran_penugasan: k2.sasaran_penugasan,
                km2_rincian_pekerjaan: k2.km2_rincian_pekerjaan
                  ? {
                      create: k2.km2_rincian_pekerjaan.map((rp) => ({
                        id_jenis_pekerjaan: rp.id_jenis_pekerjaan,
                        id_penugasan_km2: rp.id_penugasan_km2,
                      })),
                    }
                  : undefined,
              })),
            }
          : undefined,



      },

      include: {
        rute_perencanaan: true,
      },
    });

    return successResponse('Penugasan berhasil dibuat', q);
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
      where.OR = [{ dasar_penugasan: { contains: search } }];
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.penugasan.findMany({
        where,
        skip,
        take: perPage,
        include: {
          rute_perencanaan: true,
          km1: { include: { KM1SusunanTim: true } },
          km2: { include: { km2_rincian_pekerjaan: true } },
          Km3: { include: { km3_rencana_realisasi_waktu: true } },
          km4: { include: { km4_auditor: true } },
        },
        orderBy: {
          [orderBy ? orderBy : 'createdAt']: order,
        },
      }),
      this.prisma.penugasan.count({ where }),
    ]);

    return successResponse('Penugasan ditemukan', {
      data,
      total,
      page,
      perPage,
    });
  }

  async findOne(id: number) {
    const findId = await this.prisma.penugasan.findUnique({
      where: { id },
    });

    if (!findId) {
      throw new BadRequestException(
        'Penugasan dengan Id ' + id + ' tidak ditemukan',
      );
    }

    const q = await this.prisma.penugasan.findUnique({
      where: { id },
      include: {
        rute_perencanaan: true,
        km1: { include: { KM1SusunanTim: true } },
        km2: { include: { km2_rincian_pekerjaan: true } },
        Km3: { include: { km3_rencana_realisasi_waktu: true } },
        km4: { include: { km4_auditor: true } },
      },
    });

    return successResponse('Penugasan ditemukan', q);
  }

  async update(id: number, data: UpdatePenugasanDto) {
    const findId = await this.prisma.penugasan.findUnique({
      where: { id },
      include: {
        rute_perencanaan: true,
        km1: { include: { KM1SusunanTim: true } },
        km2: { include: { km2_rincian_pekerjaan: true } },
        Km3: { include: { km3_rencana_realisasi_waktu: true } },
        km4: { include: { km4_auditor: true } },
      },
    });

    if (!findId) {
      throw new BadRequestException(
        `Penugasan dengan Id ${id} tidak ditemukan`,
      );
    }

    // Replace strategy: delete existing nested data
    await this.prisma.$transaction([
      this.prisma.rutePerencanaan.deleteMany({ where: { id_penugasan: id } }),
      this.prisma.kM1.deleteMany({ where: { id_penugasan: id } }),
      this.prisma.kM2.deleteMany({ where: { id_penugasan: id } }),
      this.prisma.kM3.deleteMany({ where: { id_penugasan: id } }),
      this.prisma.km4.deleteMany({ where: { id_penugasan: id } }),
    ]);

    // Update main penugasan data
    const updated = await this.prisma.penugasan.update({
      where: { id },
      data: {
        dasar_penugasan: data.dasar_penugasan,
        sifat_penugasan: data.sifat_penugasan,
        nama_penugasan: data.nama_penugasan,
        alamat_penugasan: data.alamat_penugasan,
        nomor_kartu: data.nomor_kartu,
        penanggung_jawab: data.penanggung_jawab,
        pembantu_penanggung_jawab: data.pembantu_penanggung_jawab,
        pengendali_teknis: data.pengendali_teknis,
        ketua_tim: data.ketua_tim,
        catatan: data.catatan,
        updatedBy: data.updatedBy ?? 'system',

        rute_perencanaan: data.rute_perencanaan
          ? { create: data.rute_perencanaan }
          : undefined,
        km1: data.km1
          ? {
              create: data.km1.map((k) => ({
                ...k,
                KM1SusunanTim: k.KM1SusunanTim
                  ? { create: k.KM1SusunanTim }
                  : undefined,
              })),
            }
          : undefined,
        km2: data.km2
          ? {
              create: data.km2.map((k2) => ({
                ...k2,
                km2_rincian_pekerjaan: k2.km2_rincian_pekerjaan
                  ? { create: k2.km2_rincian_pekerjaan }
                  : undefined,
              })),
            }
          : undefined,
        Km3: data.KM3
          ? {
              create: data.KM3.map((k3) => ({
                ...k3,
                km3_rencana_realisasi_waktu: k3.km3_rencana_realisasi_waktu
                  ? { create: k3.km3_rencana_realisasi_waktu }
                  : undefined,
              })),
            }
          : undefined,
        km4: data.km4
          ? {
              create: data.km4.map((k4) => ({
                ...k4,
                km4_auditor: k4.km4_auditor
                  ? { create: k4.km4_auditor }
                  : undefined,
              })),
            }
          : undefined,
      },

      include: {
        rute_perencanaan: true,
        km1: { include: { KM1SusunanTim: true } },
        km2: { include: { km2_rincian_pekerjaan: true } },
        Km3: { include: { km3_rencana_realisasi_waktu: true } },
        km4: { include: { km4_auditor: true } },
      },
    });

    return successResponse('Penugasan berhasil diperbarui', updated);
  }

  async remove(id: number) {
    const findId = await this.prisma.penugasan.findUnique({
      where: { id },
    });

    if (!findId) {
      throw new BadRequestException(
        'Penugasan dengan Id ' + id + ' tidak ditemukan',
      );
    }

    const q = await this.prisma.penugasan.delete({
      where: { id },
    });

    return successResponse('Penugasan berhasil dihapus', q);
  }
}
