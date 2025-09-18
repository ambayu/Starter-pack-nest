import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';
import { CreatePenugasanDto } from 'src/jenis-penugasan/dto/create-penugasan.dto';
// DTO anak-anak
import { CreateSusunanTimDto } from 'src/jenis-penugasan/dto/create-susunan-tim.dto';
import { CreateRutePerencanaanDto } from 'src/jenis-penugasan/dto/create-rute-perencanaan.dto';

import { CreateKM1Dto } from 'src/jenis-penugasan/dto/create-km1.dto';

// KM2
import { CreateKM2Dto } from 'src/jenis-penugasan/dto/create-km2.dto';

// KM3
import { CreateKM3Dto } from 'src/jenis-penugasan/dto/create-km3.dto';

// KM4
import { CreateKM4Dto } from 'src/jenis-penugasan/dto/create-km4.dto';


@Injectable()
export class PenugasanService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreatePenugasanDto) {
    const findIdPenugasan = await this.prisma.penugasan.findUnique({
      where: { id: data.id },
    });

    if (!findIdPenugasan) {
      throw new BadRequestException('Penugasan tidak ditemukan');
    }

    if (!data.km1) {
      throw new BadRequestException('Data km1 wajib diisi');
    }

    const updateData: any = {};
    if (data.susunan_tim) updateData.susunan_tim = this.buildSusunanTim(data.susunan_tim);
    if (data.rute_perencanaan) updateData.rute_perencanaan = this.buildRutePerencanaan(data.rute_perencanaan);
    if (data.km1) updateData.km1 = this.buildKm1(data.km1);
    if (data.km2) updateData.km2 = this.buildKm2(data.km2);
    if (data.km3) updateData.km3 = this.buildKm3(data.km3);
    if (data.km4) updateData.km4 = this.buildKm4(data.km4);

    await this.prisma.penugasan.update({
      where: { id: data.id },
      data: updateData,
    });

    return successResponse('Penugasan berhasil di simpan', data);
  }

  // --------------------
  // Helper builders
  // --------------------

  private buildSusunanTim(items: CreateSusunanTimDto[]) {
    return {
      upsert: items.map((s) => ({
        where: { id: s.id ?? 0 },
        create: {
          id_peran: s.id_peran,
          nip: s.nip,
          satuan: s.satuan,
          honorarium: s.honorarium,
          alokasi_anggaran: s.alokasi_anggaran,
        },
        update: {
          id_peran: s.id_peran,
          nip: s.nip,
          satuan: s.satuan,
          honorarium: s.honorarium,
          alokasi_anggaran: s.alokasi_anggaran,
        },
      })),
    };
  }

  private buildRutePerencanaan(items: CreateRutePerencanaanDto[]) {
    return {
      upsert: items.map((r) => ({
        where: { id: r.id ?? 0 },
        create: {
          uraian_pekerjaan: r.uraian_pekerjaan,
          nama_penanggung: r.nama_penanggung,
          nip: r.nip,
          tanggal_paraf: r.tanggal_paraf,
        },
        update: {
          uraian_pekerjaan: r.uraian_pekerjaan,
          nama_penanggung: r.nama_penanggung,
          nip: r.nip,
          tanggal_paraf: r.tanggal_paraf,
        },
      })),
    };
  }

  private buildKm1(km1: CreateKM1Dto) {
    return {
      upsert: {
        where: { id: km1.id ?? 0 },
        create: {
          rencana_penugasan: km1.rencana_penugasan,
          tahun_penugasan_terakhir: km1.tahun_penugasan_terakhir,
          alamat: km1.alamat,
          tingkat_risiko: km1.tingkat_risiko,
          tujuan_penugasan: km1.tujuan_penugasan,
          surat_tugas_nomor: km1.surat_tugas_nomor,
          rencana_mulai: km1.rencana_mulai,
          rencana_selesai: km1.rencana_selesai,
          anggaran_diajukan: km1.anggaran_diajukan,
          anggaran_disetujui: km1.anggaran_disetujui,
          catatan_penting: km1.catatan_penting,
        },
        update: {
          rencana_penugasan: km1.rencana_penugasan,
          tahun_penugasan_terakhir: km1.tahun_penugasan_terakhir,
          alamat: km1.alamat,
          tingkat_risiko: km1.tingkat_risiko,
          tujuan_penugasan: km1.tujuan_penugasan,
          surat_tugas_nomor: km1.surat_tugas_nomor,
          rencana_mulai: km1.rencana_mulai,
          rencana_selesai: km1.rencana_selesai,
          anggaran_diajukan: km1.anggaran_diajukan,
          anggaran_disetujui: km1.anggaran_disetujui,
          catatan_penting: km1.catatan_penting,
        },
      },
    };
  }

  private buildKm2(km2: CreateKM2Dto) {
    return {
      upsert: {
        where: { id: km2.id ?? 0 }, // -1 biar pasti gagal kalau create baru
        create: {
          sasaran_penugasan: km2.sasaran_penugasan,
          km2_rincian_pekerjaan: km2.km2_rincian_pekerjaan
            ? {
              create: km2.km2_rincian_pekerjaan.map((r) => ({
                id_kelompok_pengawasan: r.id_kelompok_pengawasan,
                id_item_pengawasan: r.id_item_pengawasan,
                tanggal: r.tanggal,
                anggaran_waktu: r.anggaran_waktu,
                km2Pelaksanaan: r.km2Pelaksanaan
                  ? {
                    create: r.km2Pelaksanaan.map((p) => ({
                      id_peran: p.id_peran,
                    })),
                  }
                  : undefined,
              })),
            }
            : undefined,
        },
        update: {
          sasaran_penugasan: km2.sasaran_penugasan,
          km2_rincian_pekerjaan: km2.km2_rincian_pekerjaan
            ? {
              upsert: km2.km2_rincian_pekerjaan.map((r) => ({
                where: { id: r.id ?? -1 },
                create: {
                  id_kelompok_pengawasan: r.id_kelompok_pengawasan,
                  id_item_pengawasan: r.id_item_pengawasan,
                  tanggal: r.tanggal,
                  anggaran_waktu: r.anggaran_waktu,
                  km2Pelaksanaan: r.km2Pelaksanaan
                    ? {
                      create: r.km2Pelaksanaan.map((p) => ({
                        id_peran: p.id_peran,
                      })),
                    }
                    : undefined,
                },
                update: {
                  tanggal: r.tanggal,
                  anggaran_waktu: r.anggaran_waktu,
                  km2Pelaksanaan: r.km2Pelaksanaan
                    ? {
                      upsert: r.km2Pelaksanaan.map((p) => ({
                        where: { id: p.id ?? -1 },
                        create: { id_peran: p.id_peran },
                        update: { id_peran: p.id_peran },
                      })),
                    }
                    : undefined,
                },
              })),
            }
            : undefined,
        },
      },
    };
  }


  private buildKm3(km3: CreateKM3Dto) {
    return {
      upsert: {
        where: { id: km3.id ?? -1 }, // -1 biar gak pernah cocok kalau create baru
        create: {
          km3_rincian_pekerjaan: km3.km3_rincian_pekerjaan
            ? {
              create: km3.km3_rincian_pekerjaan.map((r) => ({
                id_kelompok_pengawasan: r.id_kelompok_pengawasan,
                id_item_pengawasan: r.id_item_pengawasan,
                rencana_jam: r.rencana_jam,
                anggaran_jam: r.anggaran_jam,
                realisasi_biaya: r.realisasi_biaya,
                anggaran_biaya: r.anggaran_biaya,
              })),
            }
            : undefined,
          km3_peran: km3.km3_peran
            ? {
              create: km3.km3_peran.map((p) => ({
                id_peran: p.id_peran,
                rencana_jam: p.rencana_jam,
                realisasi_jam: p.realisasi_jam,
              })),
            }
            : undefined,
        },
        update: {
          km3_rincian_pekerjaan: km3.km3_rincian_pekerjaan
            ? {
              upsert: km3.km3_rincian_pekerjaan.map((r) => ({
                where: { id: r.id ?? -1 },
                create: {
                  id_kelompok_pengawasan: r.id_kelompok_pengawasan,
                  id_item_pengawasan: r.id_item_pengawasan,
                  rencana_jam: r.rencana_jam,
                  anggaran_jam: r.anggaran_jam,
                  realisasi_biaya: r.realisasi_biaya,
                  anggaran_biaya: r.anggaran_biaya,
                },
                update: {
                  rencana_jam: r.rencana_jam,
                  anggaran_jam: r.anggaran_jam,
                  realisasi_biaya: r.realisasi_biaya,
                  anggaran_biaya: r.anggaran_biaya,
                },
              })),
            }
            : undefined,
          km3_peran: km3.km3_peran
            ? {
              upsert: km3.km3_peran.map((p) => ({
                where: { id: p.id ?? -1 },
                create: {
                  id_peran: p.id_peran,
                  rencana_jam: p.rencana_jam,
                  realisasi_jam: p.realisasi_jam,
                },
                update: {
                  id_peran: p.id_peran,
                  rencana_jam: p.rencana_jam,
                  realisasi_jam: p.realisasi_jam,
                },
              })),
            }
            : undefined,
        },
      },
    };
  }


  private buildKm4(km4: CreateKM4Dto) {
    return {
      upsert: {
        where: { id: km4.id ?? -1 },
        create: {
          tujuan: km4.tujuan
            ? {
              create: km4.tujuan.map((t) => ({
                deskripsi: t.deskripsi,
                program_kerja: t.program_kerja
                  ? {
                    create: t.program_kerja.map((pk) => ({
                      prosedur: pk.prosedur,
                      anggaran_waktu: pk.anggaran_waktu,
                      realisasi_waktu: pk.realisasi_waktu,
                      no_kka: pk.no_kka,
                      auditors: pk.auditors
                        ? {
                          create: pk.auditors.map((a) => ({
                            nama: a.nama,
                            nip: a.nip,
                          })),
                        }
                        : undefined,
                    })),
                  }
                  : undefined,
              })),
            }
            : undefined,
        },
        update: {
          tujuan: km4.tujuan
            ? {
              upsert: km4.tujuan.map((t) => ({
                where: { id: t.id ?? -1 },
                create: {
                  deskripsi: t.deskripsi,
                  program_kerja: t.program_kerja
                    ? {
                      create: t.program_kerja.map((pk) => ({
                        prosedur: pk.prosedur,
                        anggaran_waktu: pk.anggaran_waktu,
                        realisasi_waktu: pk.realisasi_waktu,
                        no_kka: pk.no_kka,
                        auditors: pk.auditors
                          ? {
                            create: pk.auditors.map((a) => ({
                              nama: a.nama,
                              nip: a.nip,
                            })),
                          }
                          : undefined,
                      })),
                    }
                    : undefined,
                },
                update: {
                  deskripsi: t.deskripsi,
                  program_kerja: t.program_kerja
                    ? {
                      upsert: t.program_kerja.map((pk) => ({
                        where: { id: pk.id ?? -1 },
                        create: {
                          prosedur: pk.prosedur,
                          anggaran_waktu: pk.anggaran_waktu,
                          realisasi_waktu: pk.realisasi_waktu,
                          no_kka: pk.no_kka,
                          auditors: pk.auditors
                            ? {
                              create: pk.auditors.map((a) => ({
                                nama: a.nama,
                                nip: a.nip,
                              })),
                            }
                            : undefined,
                        },
                        update: {
                          prosedur: pk.prosedur,
                          anggaran_waktu: pk.anggaran_waktu,
                          realisasi_waktu: pk.realisasi_waktu,
                          no_kka: pk.no_kka,
                          auditors: pk.auditors
                            ? {
                              upsert: pk.auditors.map((a) => ({
                                where: { id: a.id ?? -1 },
                                create: { nama: a.nama, nip: a.nip },
                                update: { nama: a.nama, nip: a.nip },
                              })),
                            }
                            : undefined,
                        },
                      })),
                    }
                    : undefined,
                },
              })),
            }
            : undefined,
        },
      },
    };
  }

}
