import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class RincianPekerjaanSeeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    const kelompok_rincian_pekerjaan = [
      { name: 'Pekerjaan Persiapan', id: 1 },
      { name: 'Pembicaraan Pendahuluan', id: 2 },
      { name: 'Penyelesaian Pekerjaan', id: 3 },
    ];

    const rincian_pekerjaan = [
      {
        nama: 'Pelaksanaan Penugasan',
        id_kelompok_rincian_pekerjaan: 1,
      },
      {
        nama: 'Surevi Pendahuluan (Pengumpulan data permanen dan sebagainya)',
        id_kelompok_rincian_pekerjaan: 1,
      },
      {
        nama: 'Koordinasi terkait Dokumen Tindak Lanjut',
        id_kelompok_rincian_pekerjaan: 1,
      },
      {
        nama: 'Pengujian, analisis dan evaluasi dokumen TL',
        id_kelompok_rincian_pekerjaan: 2,
      },
      { nama: 'Menyusun daftar Dokumen TL', id_kelompok_rincian_pekerjaan: 2 },
      {
        nama: 'Mengomunikasikan dokumen yang didapat kepada Ketua Tim',
        id_kelompok_rincian_pekerjaan: 2,
      },
      {
        nama: 'Mengomunikasikan dokumen yang didapat kepada Perangkat Daerah terkait',
        id_kelompok_rincian_pekerjaan: 2,
      },
      {
        nama: 'Mengembangkan Hasil Monitoring TL',
        id_kelompok_rincian_pekerjaan: 2,
      },
      {
        nama: 'Membicarakan tindakan koreksi atas dokumen yang sudah didapat',
        id_kelompok_rincian_pekerjaan: 2,
      },
      {
        nama: 'Membicarakan tindakan koreksi atas dokumen yang belum didapat',
        id_kelompok_rincian_pekerjaan: 2,
      },
      { nama: 'Meneliti kelengkapan KKA', id_kelompok_rincian_pekerjaan: 3 },
      {
        nama: 'Pembahasan Ketua Tim, Pengendali Teknis, dan Pembantu Penanggung Jawab ',
        id_kelompok_rincian_pekerjaan: 3,
      },
      { nama: 'Mengomunikasikan temuan ', id_kelompok_rincian_pekerjaan: 3 },
      { nama: 'Penyusunan laporan ', id_kelompok_rincian_pekerjaan: 3 },
    ];

    for (const k of kelompok_rincian_pekerjaan) {
      const exist = await this.prisma.kelompokRincianPekerjaan.findFirst({
        where: { name: k.name },
      });
      if (!exist) {
        await this.prisma.kelompokRincianPekerjaan.create({
          data: { name: k.name },
        });
        console.log(`✅ Kelompok ${k.name} ditambahkan`);
      } else {
        console.log(`⏩ Kelompok ${k.name} sudah ada, skip`);
      }
    }

    // seed rincian
    for (const r of rincian_pekerjaan) {
      const exist = await this.prisma.rincianPekerjaan.findFirst({
        where: {
          name: r.nama,
          id_kelompok_rincian_pekerjaan: r.id_kelompok_rincian_pekerjaan,
        },
      });
      if (!exist) {
        await this.prisma.rincianPekerjaan.create({
          data: {
            name: r.nama,
            id_kelompok_rincian_pekerjaan: r.id_kelompok_rincian_pekerjaan,
          },
        });
        console.log(`✅ Rincian ${r.nama} ditambahkan`);
      } else {
        console.log(`⏩ Rincian ${r.nama} sudah ada, skip`);
      }
    }
  }
}
