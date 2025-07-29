import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKomponenAsbDto } from './dto/create-komponen-asb.dto';
import { UpdateKomponenAsbDto } from './dto/update-komponen-asb.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';
import { contains } from 'class-validator';
import * as XLSX from 'xlsx';

interface ExcelRow {
  'KODE ASB'?: string; // Opsional karena beberapa baris tidak memiliki kode
  'URAIAN': string;
  'SATUAN'?: string; // Opsional karena beberapa baris tidak memiliki satuan
  'KOEFISIEN'?: number; // Opsional karena beberapa baris tidak memiliki koefisien
  'HARGA SATUAN'?: string; // Opsional karena beberapa baris tidak memiliki harga
  'JUMLAH HARGA'?: string; // Opsional karena beberapa baris tidak memiliki jumlah harga
}

@Injectable()
export class KomponenAsbService {
  constructor(private prisma: PrismaService) { }
  async create(data: CreateKomponenAsbDto) {
    const q = await this.prisma.komponen_ASB.create({
      data: {
        id_kegiatan_asb: data.id_kegiatan_asb,
        uraian: data.uraian,
        id_kategori_komponen: data.id_kategori_komponen,
        id_satuan: data.id_satuan,
        koefisien: data.koefisien,
        harga_satuan: data.harga_satuan,
        jumlah_harga: data.jumlah_harga,
      },
    });

    return successResponse('Komponen ASB berhasil dibuat', q);
  }

  async findAll(page = 1, perPage = 10, search?: string) {
    const skip = (page - 1) * perPage;
    const where: any = {};
    where.deletedAt = null; // Pastikan hanya mengambil data yang tidak dihapus
    if (search) {
      where.OR = [
        {
          uraian: {
            contains: search,
          },
        },
        {
          satuan: {
            nama: {
              contains: search,
            },
          },
        },
        {
          kategori_komponen: {
            nama: {
              contains: search,
            },
          },
        },
      ];
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.komponen_ASB.findMany({
        where,
        skip,
        take: perPage,
        include: {
          kegiatan_asb: true,
          satuan: true,
          kategori_komponen: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.komponen_ASB.count({ where }),
    ]);
    return successResponse('Berhasil mendapatkan semua komponen ASB', {
      data,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  }

  async findOne(id: number) {
    const findId = await this.prisma.komponen_ASB.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException(
        `Komponen ASB dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.komponen_ASB.findUnique({
      where: { id, deletedAt: null },
      include: {
        kegiatan_asb: true,
        kategori_komponen: true,
        satuan: true,
      },
    });
    return successResponse(
      `Berhasil mendapatkan komponen ASB dengan ID ${id}`,
      q,
    );
  }

  async update(id: number, data: UpdateKomponenAsbDto) {
    const findId = await this.prisma.komponen_ASB.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException(
        `Komponen ASB dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.komponen_ASB.update({
      where: { id },
      data: {
        id_kegiatan_asb: data.id_kegiatan_asb,
        uraian: data.uraian,
        id_kategori_komponen: data.id_kategori_komponen,
        id_satuan: data.id_satuan,
        koefisien: data.koefisien,
        harga_satuan: data.harga_satuan,
        jumlah_harga: data.jumlah_harga,
      },
    });

    return successResponse(
      `Berhasil memperbarui komponen ASB dengan ID ${id}`,
      q,
    );
  }

  async remove(id: number) {
    const findId = await this.prisma.komponen_ASB.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        `Komponen ASB dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.komponen_ASB.delete({
      where: { id },
    });

    return successResponse(
      `Berhasil menghapus komponen ASB dengan ID ${id}`,
      q,
    );
  }

  //import excel
  async importExcel(file: Express.Multer.File) {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = XLSX.utils.sheet_to_json<ExcelRow>(workbook.Sheets[sheetName]);

    let lastKegiatanId: number | null = null;
    const kegiatanQueue: { kode: string; uraian: string; satuan?: string }[] = [];
    const komponenQueue: {
      uraian: string;
      id_satuan: number;
      koefisien: number;
      harga_satuan: number;
      jumlah_harga: number;
      id_kegiatan_asb: number;
      id_kategori_komponen: number;
    }[] = [];

    for (const row of worksheet) {
      try {
        if (row['KODE ASB']) {
          // Proses antrian sebelumnya
          if (kegiatanQueue.length > 0) {
            const kegiatan = await this.ensureKegiatanAsbExists(kegiatanQueue[0].kode, kegiatanQueue[0].uraian, kegiatanQueue[0].satuan);
            lastKegiatanId = kegiatan.id;
            kegiatanQueue.length = 0;
          }
          if (komponenQueue.length > 0 && lastKegiatanId) {
            await this.prisma.komponen_ASB.createMany({
              data: komponenQueue,
            });
            komponenQueue.length = 0;
          }

          // Buat Kegiatan_ASB baru
          const kegiatan = await this.ensureKegiatanAsbExists(row['KODE ASB'], row['URAIAN'], row['SATUAN']);
          lastKegiatanId = kegiatan.id;
        } else {
          if (!lastKegiatanId) {
            kegiatanQueue.push({ kode: '', uraian: row['URAIAN'], satuan: row['SATUAN'] });
          } else {
            const kategoriKomponenId = await this.ensureKategoriKomponenExists(row['URAIAN']);
            const satuanId = row['SATUAN'] ? await this.ensureSatuanExists(row['SATUAN']) : 1;

            komponenQueue.push({
              uraian: row['URAIAN'],
              id_satuan: satuanId,
              koefisien: row['KOEFISIEN'] !== undefined ? row['KOEFISIEN'] : 0,
              harga_satuan: this.convertToDecimal(row['HARGA SATUAN']),
              jumlah_harga: this.convertToDecimal(row['JUMLAH HARGA']),
              id_kegiatan_asb: lastKegiatanId,
              id_kategori_komponen: kategoriKomponenId,
            });
          }
        }
      } catch (error) {
        console.error('Error memproses baris:', row, 'Error:', error.message);
        throw error;
      }
    }

    // Proses sisa antrian
    if (kegiatanQueue.length > 0 && lastKegiatanId) {
      const kegiatan = await this.ensureKegiatanAsbExists(kegiatanQueue[0].kode, kegiatanQueue[0].uraian, kegiatanQueue[0].satuan);
      lastKegiatanId = kegiatan.id;
    }
    if (komponenQueue.length > 0 && lastKegiatanId) {
      await this.prisma.komponen_ASB.createMany({
        data: komponenQueue,
      });
    }

    return { message: 'Import berhasil' };
  }

  private async ensureKegiatanAsbExists(kode: string, uraian: string, satuan?: string): Promise<{ id: number }> {
    let kegiatan = await this.prisma.kegiatan_ASB.findFirst({
      where: { kode: kode || '' },
    });
    if (!kegiatan) {
      kegiatan = await this.prisma.kegiatan_ASB.create({
        data: {
          kode: kode || '',
          uraian,
          id_satuan: satuan ? await this.ensureSatuanExists(satuan) : 1,
          id_peraturan_tahunan: 1, // Sesuaikan dengan ID Peraturan_Tahunan yang ada
        },
      });
    }
    return kegiatan;
  }

  private async ensureKategoriKomponenExists(uraian: string): Promise<number> {
    let kategori = await this.prisma.kategori_Komponen.findFirst({
      where: { nama: uraian },
    });
    if (!kategori) {
      kategori = await this.prisma.kategori_Komponen.create({
        data: { nama: uraian },
      });
    }
    return kategori.id;
  }

  private async ensureSatuanExists(satuan: string): Promise<number> {
    if (!satuan) {
      satuan = 'M1';
    }
    let satuanRecord = await this.prisma.satuan.findFirst({
      where: { nama: satuan },
    });
    if (!satuanRecord) {
      satuanRecord = await this.prisma.satuan.create({
        data: { nama: satuan },
      });
    }
    return satuanRecord.id;
  }

  private convertToDecimal(value: string | number | undefined): number {
    if (value === undefined) {
      return 0;
    }
    if (typeof value === 'number') {
      return value; // Jika sudah number, gunakan langsung
    }
    if (typeof value === 'string') {
      const cleanedValue = value.replace(/Rp|\,| /g, '').trim();
      return parseFloat(cleanedValue) || 0;
    }
    return 0; // Default jika tipe tidak dikenali
  }
}

