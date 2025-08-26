import { Injectable } from '@nestjs/common';
import { CreatePenugasanDto } from './dto/create-penugasan.dto';
import { UpdatePenugasanDto } from './dto/update-penugasan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class PenugasanService {
  constructor(private prisma: PrismaService) { }
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

        // KM3
        KM3: data.KM3
          ? {
            create: data.KM3.map((k3) => ({
              id_jenis_pekerjaan: k3.id_jenis_pekerjaan,
              id_item_jenis_pekerjaan: k3.id_item_jenis_pekerjaan,
              rencana_jam: k3.rencana_jam,
              anggaran_jam: k3.anggaran_jam,
              realisasi_biaya: k3.realisasi_biaya,
              anggaran_biaya: k3.anggaran_biaya,
              km3_rencana_realisasi_waktu: k3.km3_rencana_realisasi_waktu
                ? {
                  create: k3.km3_rencana_realisasi_waktu.map((rw) => ({
                    id_peran: rw.id_peran,
                    rencana_jam: rw.rencana_jam,
                    realisasi_jam: rw.realisasi_jam,
                  })),
                }
                : undefined,
            })),
          }
          : undefined,

        // KM4
        km4: data.km4
          ? {
            create: data.km4.map((k4) => ({
              tujuan: k4.tujuan,
              prosedur: k4.prosedur,
              anggaran_waktu: k4.anggaran_waktu,
              realisasi_waktu: k4.realisasi_waktu,
              no_kka: k4.no_kka,
              km4_auditor: k4.km4_auditor
                ? {
                  create: k4.km4_auditor.map((a) => ({
                    nip: a.nip,
                    id_pegawai: a.id_pegawai,
                  })),
                }
                : undefined,
            })),
          }
          : undefined,
      },

      include: {
        rute_perencanaan: true,
        km1: { include: { KM1SusunanTim: true } },
        km2: { include: { km2_rincian_pekerjaan: true } },
        KM3: { include: { km3_rencana_realisasi_waktu: true } },
        km4: { include: { km4_auditor: true } },
      },
    });

    return successResponse('Penugasan berhasil dibuat', q);
  }



  findAll() {
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
