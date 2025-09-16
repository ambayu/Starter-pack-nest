import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdatePenugasanDto } from './dto/update-penugasan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';
import { CreatePenugasanDto } from 'src/jenis-penugasan/dto/create-penugasan.dto';

@Injectable()
export class PenugasanService {
  constructor(private prisma: PrismaService) { }
  async create(data: CreatePenugasanDto) {
    // Cek apakah Penugasan ada
    const findIdPenugasan = await this.prisma.penugasan.findUnique({
      where: { id: data.id },
    });

    if (!findIdPenugasan) {
      throw new BadRequestException('Penugasan tidak ditemukan');
    }

    if (!data.km1) {
      throw new BadRequestException('Data km1 wajib diisi');
    }

    const result = await this.prisma.penugasan.update({
      where: { id: data.id },
      data: {
        susunan_tim: data.susunan_tim
          ? {
            upsert: data.susunan_tim.map((s) => ({
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
          }
          : undefined,

        rute_perencanaan: data.rute_perencanaan
          ? {
            upsert: data.rute_perencanaan.map((r) => ({
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
          }
          : undefined
        ,
        // KM1 upsert
        km1: {
          upsert: {
            where: { id: data.km1.id ?? 0 },
            create: {
              rencana_penugasan: data.km1.rencana_penugasan,
              tahun_penugasan_terakhir: data.km1.tahun_penugasan_terakhir,
              alamat: data.km1.alamat,
              tingkat_risiko: data.km1.tingkat_risiko,
              tujuan_penugasan: data.km1.tujuan_penugasan,
              surat_tugas_nomor: data.km1.surat_tugas_nomor,
              rencana_mulai: data.km1.rencana_mulai,
              rencana_selesai: data.km1.rencana_selesai,
              anggaran_diajukan: data.km1.anggaran_diajukan,
              anggaran_disetujui: data.km1.anggaran_disetujui,
              catatan_penting: data.km1.catatan_penting,
            },
            update: {
              rencana_penugasan: data.km1.rencana_penugasan,
              tahun_penugasan_terakhir: data.km1.tahun_penugasan_terakhir,
              alamat: data.km1.alamat,
              tingkat_risiko: data.km1.tingkat_risiko,
              tujuan_penugasan: data.km1.tujuan_penugasan,
              surat_tugas_nomor: data.km1.surat_tugas_nomor,
              rencana_mulai: data.km1.rencana_mulai,
              rencana_selesai: data.km1.rencana_selesai,
              anggaran_diajukan: data.km1.anggaran_diajukan,
              anggaran_disetujui: data.km1.anggaran_disetujui,
              catatan_penting: data.km1.catatan_penting,
            },
          },
        },

        // KM2 upsert
        km2: data.km2
          ? {
            upsert: {
              where: { id: data.km2.id ?? 0 },
              create: {
                sasaran_penugasan: data.km2.sasaran_penugasan,
                km2_rincian_pekerjaan: data.km2.km2_rincian_pekerjaan
                  ? {
                    create: data.km2.km2_rincian_pekerjaan.map((r) => ({
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
                sasaran_penugasan: data.km2.sasaran_penugasan,
                km2_rincian_pekerjaan: data.km2.km2_rincian_pekerjaan
                  ? {
                    upsert: data.km2.km2_rincian_pekerjaan.map((r) => ({
                      where: { id: r.id ?? 0 }, // jika ada id, update, kalau 0 maka create baru
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
                              where: { id: p.id ?? 0 },
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
          }
          : undefined,
//catatan
        km3: data.km3
          ? {
            upsert: {
              where: { id: data.km3.id ?? 0 },
              create: {
                km3_rincian_pekerjaan: data.km3.km3_rincian_pekerjaan
                  ? {
                    create: data.km3.km3_rincian_pekerjaan.map((r) => ({
                      id_kelompok_pengawasan: r.id_kelompok_pengawasan,
                      id_item_pengawasan: r.id_item_pengawasan,
                      rencana_jam: r.rencana_jam,
                      anggaran_jam: r.anggaran_jam,
                      realisasi_biaya: r.realisasi_biaya,
                      anggaran_biaya: r.anggaran_biaya,
                    })),
                  }
                  : undefined,
                km3_peran: data.km3.km3_peran
                  ? {
                    create: data.km3.km3_peran.map((p) => ({
                      id_peran: p.id_peran,
                      rencana_jam: p.rencana_jam,
                      realisasi_jam: p.realisasi_jam,
                    })),
                  }
                  : undefined,
              },
              update: {
                km3_rincian_pekerjaan: data.km3.km3_rincian_pekerjaan
                  ? {
                    upsert: data.km3.km3_rincian_pekerjaan.map((r) => ({
                      where: { id: r.id ?? 0 },
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
                km3_peran: data.km3.km3_peran
                  ? {
                    upsert: data.km3.km3_peran.map((p) => ({
                      where: { id: p.id ?? 0 },
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
          }
          : undefined,

        km4: data.km4
          ? {
            upsert: {
              where: { id: data.km4.id ?? 0 },
              create: {
                km4_program_kerja: data.km4.km4_program_kerja
                  ? {
                    create: data.km4.km4_program_kerja.map((pk) => ({
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
                km4_program_kerja: data.km4.km4_program_kerja
                  ? {
                    upsert: data.km4.km4_program_kerja.map((pk) => ({
                      where: { id: pk.id ?? 0 },
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
                              where: { id: a.id ?? 0 },
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
            },
          }
          : undefined,
      },
      include: {
        km1: true,
        km2: {
          include: {
            km2_rincian_pekerjaan: { include: { km2Pelaksanaan: true } },
          },
        },
        km3: {
          include: {
            km3_peran: true,
          },
        },
        km4: {
          include: {
            km4_program_kerja: {
              include: {
                auditors: true,
              },
            },
          },
        },
      },
    });

    return successResponse('Penugasan berhasil di simpan', data);
  }

  findAll(
    page: number,
    perPage: number,
    search?: string,
    orderBy?: string,
    order?: string,
  ) {
    return `This action returns all penugasan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} penugasan`;
  }

  update(id: number, data: UpdatePenugasanDto) {
    return `This action updates a #${id} penugasan`;
  }

  remove(id: number) {
    return `This action removes a #${id} penugasan`;
  }
}
