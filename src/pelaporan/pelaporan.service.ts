import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';
import { CreatePelaporanDto } from './dto/create-pelaporan.dto';

@Injectable()
export class PelaporanService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreatePelaporanDto) {
    if (!data.judul_pelaporan) {
      throw new BadRequestException('Judul pelaporan wajib diisi');
    }

    const baseData: any = {
      id_jenis_penugasan: data.id_jenis_penugasan,
      judul_pelaporan: data.judul_pelaporan,
      alamat: data.alamat,
      periode: data.periode,
      no_kp: data.no_kp,
      tgl_kp: data.tgl_kp,
      createdBy: data.createdBy,
    };

    // --------- CREATE BARU ---------
    if (!data.id) {
      const result = await this.prisma.pelaporan.create({
        data: {
          ...baseData,
          ...(data.Urutan_pekerjaan_pelaporan?.length
            ? {
              Urutan_pekerjaan_pelaporan: {
                create: data.Urutan_pekerjaan_pelaporan.map((u) => ({
                  judul: u.judul,
                  id_user_penanggung: u.id_user_penanggung ?? null,
                  tanggal_1: u.tanggal_1 ?? null,
                  tanggal_2: u.tanggal_2 ?? null,
                  tanggal_3: u.tanggal_3 ?? null,
                  tanggal_4: u.tanggal_4 ?? null,
                })),
              },
            }
            : {}),
          ...(data.km5?.length
            ? {
              km5: {
                create: data.km5.map((k) => ({
                  komentar: k.komentar,
                  index_kka: k.index_kka,
                  penyelesaian: k.penyelesaian,
                  persetujuan: k.persetujuan,
                })),
              },
            }
            : {}),
          ...(data.km6?.length
            ? {
              km6: {
                create: data.km6.map((k) => ({
                  uraian: k.uraian,
                  id_user_penanggung: k.id_user_penanggung ?? null,
                  tanggal_1: k.tanggal_1,
                  tanggal_2: k.tanggal_2,
                  tanggal_3: k.tanggal_3,
                  tanggal_4: k.tanggal_4,
                })),
              },
            }
            : {}),
          ...(data.km7?.length
            ? {
              km7: {
                create: data.km7.map((k) => ({
                  halaman_lhr: k.halaman_lhr,
                  masalah: k.masalah,
                  nomor_kkr: k.nomor_kkr,
                })),
              },
            }
            : {}),
          ...(data.km8?.length
            ? {
              km8: {
                create: data.km8.map((k) => ({
                  kondisi: k.kondisi,
                  kriteria: k.kriteria,
                  sebab: k.sebab,
                  akibat: k.akibat,
                  rekomendasi: k.rekomendasi,
                  rencana_tindak_lanjut: k.rencana_tindak_lanjut,
                  komentar_auditi: k.komentar_auditi,
                  komentar_auditor: k.komentar_auditor,
                  ket: k.ket,
                })),
              },
            }
            : {}),
        },
      });
      return successResponse('Pelaporan berhasil dibuat', result);
    }

    // --------- UPDATE ---------
    const result = await this.prisma.pelaporan.update({
      where: { id: data.id },
      data: {
        ...baseData,
        ...(data.Urutan_pekerjaan_pelaporan?.length
          ? {
            Urutan_pekerjaan_pelaporan: {
              deleteMany: { id_pelaporan: data.id },
              create: data.Urutan_pekerjaan_pelaporan.map((u) => ({
                judul: u.judul,
                id_user_penanggung: u.id_user_penanggung ?? null,
                tanggal_1: u.tanggal_1 ?? null,
                tanggal_2: u.tanggal_2 ?? null,
                tanggal_3: u.tanggal_3 ?? null,
                tanggal_4: u.tanggal_4 ?? null,
              })),
            },
          }
          : {}),
        ...(data.km5?.length
          ? {
            km5: {
              deleteMany: { id_pelaporan: data.id },
              create: data.km5.map((k) => ({
                komentar: k.komentar,
                index_kka: k.index_kka,
                penyelesaian: k.penyelesaian,
                persetujuan: k.persetujuan,
              })),
            },
          }
          : {}),
        ...(data.km6?.length
          ? {
            km6: {
              deleteMany: { id_pelaporan: data.id },
              create: data.km6.map((k) => ({
                uraian: k.uraian,
                id_user_penanggung: k.id_user_penanggung ?? null,
                tanggal_1: k.tanggal_1,
                tanggal_2: k.tanggal_2,
                tanggal_3: k.tanggal_3,
                tanggal_4: k.tanggal_4,
              })),
            },
          }
          : {}),
        ...(data.km7?.length
          ? {
            km7: {
              deleteMany: { id_pelaporan: data.id },
              create: data.km7.map((k) => ({
                halaman_lhr: k.halaman_lhr,
                masalah: k.masalah,
                nomor_kkr: k.nomor_kkr,
              })),
            },
          }
          : {}),
        ...(data.km8?.length
          ? {
            km8: {
              deleteMany: { id_pelaporan: data.id },
              create: data.km8.map((k) => ({
                kondisi: k.kondisi,
                kriteria: k.kriteria,
                sebab: k.sebab,
                akibat: k.akibat,
                rekomendasi: k.rekomendasi,
                rencana_tindak_lanjut: k.rencana_tindak_lanjut,
                komentar_auditi: k.komentar_auditi,
                komentar_auditor: k.komentar_auditor,
                ket: k.ket,
              })),
            },
          }
          : {}),
      },
    });

    return successResponse('Pelaporan berhasil diperbarui', result);
  }
}
