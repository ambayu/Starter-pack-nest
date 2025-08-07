import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKomponenAsbDto } from './dto/create-komponen-asb.dto';
import { UpdateKomponenAsbDto } from './dto/update-komponen-asb.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';
import { contains } from 'class-validator';
import * as XLSX from 'xlsx';
import { equal } from 'assert';

@Injectable()
export class KomponenAsbService {
  constructor(private prisma: PrismaService) { }
  async create(data: CreateKomponenAsbDto) {
    const q = await this.prisma.komponen_ASB.create({
      data: {
        uraian: data.uraian,
        id_item_kegiatan_asb: data.id_item_kegiatan_asb,
        id_satuan: data.id_satuan,
        koefisien: data.koefisien.toString(),
        harga_satuan: data.harga_satuan.toString(),
        jumlah_harga: data.jumlah_harga.toString(),
      },
    });

    return successResponse('Komponen ASB berhasil dibuat', q);
  }

  async findAll(page = 1, perPage = 10, search?: string) {
    const skip = (page - 1) * perPage;
    const where: any = { deletedAt: null };

    if (search) {
      where.OR = [
        {
          uraian: {
            contains: search,
          },
        },
        {
          harga_satuan: {
            startsWith: search,
          },
        },
        {
          jumlah_harga: {
            startsWith: search,
          },
        },
        {
          satuan: {
            is: {
              nama: {
                contains: search,
              },
            },
          },
        },
        {
          item_kegiatan_asb: {
            sub_kegiatan_asb: {
              kegiatan_asb: {
                kelompok_asb: {
                  kode: {
                    contains: search,
                  },
                },
              },
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
          item_kegiatan_asb: {
            include: {
              sub_kegiatan_asb: {
                include: {
                  kegiatan_asb: {
                    include: {
                      kelompok_asb: true,
                    },
                  },
                },
              },
            },
          },
          satuan: true,
        },
        orderBy: { updatedAt: "asc" },
      }),
      this.prisma.komponen_ASB.count({ where }),
    ]);

    return successResponse("Berhasil mendapatkan semua komponen ASB", {
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
        id_item_kegiatan_asb: data.id_item_kegiatan_asb,
        uraian: data.uraian,
        id_satuan: data.id_satuan,
        koefisien: data.koefisien?.toString(),
        harga_satuan: data.harga_satuan?.toString(),
        jumlah_harga: data.jumlah_harga?.toString(),
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

  async importExcel(buffer: Buffer) {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<any>(sheet, { header: 1 });

    let currentKelompokId: number | null = null;
    let currentKegiatanId: number | null = null;
    let currentSubKegiatanId: number | null = null;
    let currentItemKegiatanId: number | null = null;

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const kodeAsb = (row[0] || '').toString().trim();
      const uraian = (row[1] || '').toString().trim();
      const satuan = (row[2] || '').toString().trim();
      const koefisien = row[3];
      const hargaSatuan = row[4];
      const jumlahHarga = row[5];

      const hasDot = kodeAsb.includes('.');

      // 1. Kelompok_ASB
      if (kodeAsb && !hasDot) {
        const kelompok = await this.prisma.kelompok_ASB.findFirst({
          where: { kode: kodeAsb },
        });

        if (!kelompok) {
          const created = await this.prisma.kelompok_ASB.create({
            data: {
              kode: kodeAsb,
              uraian,
            },
          });
          currentKelompokId = created.id;
        } else {

          currentKelompokId = kelompok.id;
        }

        continue;
      }

      // 2. Kegiatan_ASB (punya titik, tidak punya satuan)
      if (kodeAsb && hasDot && !satuan) {
        const kodeKegiatan = kodeAsb.split('.').slice(1).join('.'); // bagian setelah titik pertama

        const kegiatan = await this.prisma.kegiatan_ASB.findFirst({
          where: {
            kode: kodeKegiatan,
            id_kelompok_asb: currentKelompokId ?? undefined,
          },
        });

        if (!kegiatan) {
          const created = await this.prisma.kegiatan_ASB.create({
            data: {
              kode: kodeKegiatan,
              uraian,
              id_kelompok_asb: currentKelompokId ?? undefined,
            },
          });
          currentKegiatanId = created.id;
        } else {
          currentKegiatanId = kegiatan.id;
        }

        continue;
      }

      // 3. SubKegiatan_ASB (punya titik dan punya satuan)
      if (kodeAsb && hasDot && satuan) {
        const kodeSubKegiatan = kodeAsb.split('.').slice(1).join('.');

        const sub = await this.prisma.subKegiatan_ASB.findFirst({
          where: {
            kode: kodeSubKegiatan,
            id_kegiatan_asb: currentKegiatanId ?? undefined,
          },
        });

        if (!sub) {
          const created = await this.prisma.subKegiatan_ASB.create({
            data: {
              kode: kodeSubKegiatan,
              uraian,
              id_kegiatan_asb: currentKegiatanId!,
              kelompok_ASBId: currentKelompokId ?? undefined,
            },
          });
          currentSubKegiatanId = created.id;
        } else {
          currentSubKegiatanId = sub.id;
        }

        // Buat 1 itemKegiatan jika belum ada
        const item = await this.prisma.itemKegiatanASB.findFirst({
          where: {
            id_sub_kegiatan_asb: currentSubKegiatanId,
            deletedAt: null,
          },
        });

        if (!item) {
          const created = await this.prisma.itemKegiatanASB.create({
            data: {
              uraian: 'Auto Generated Item Kegiatan',
              id_sub_kegiatan_asb: currentSubKegiatanId,
            },
          });
          currentItemKegiatanId = created.id;
        } else {
          currentItemKegiatanId = item.id;
        }

        continue;
      }

      // 4. Item Kegiatan (tidak ada kode dan satuan)
      if (!kodeAsb && !satuan && uraian) {
        // Cek apakah uraian item sudah ada dalam sub kegiatan tersebut
        const existingItem = await this.prisma.itemKegiatanASB.findFirst({
          where: {
            uraian: uraian,
            id_sub_kegiatan_asb: currentSubKegiatanId!,
            deletedAt: null,
          },
        });

        if (!existingItem) {
          const item = await this.prisma.itemKegiatanASB.create({
            data: {
              uraian,
              id_sub_kegiatan_asb: currentSubKegiatanId!,
            },
          });
          currentItemKegiatanId = item.id;
        } else {
          currentItemKegiatanId = existingItem.id;
        }

        continue;
      }


      // 5. Komponen_ASB (baris dengan satuan & nilai-nilai lainnya)
      if (uraian && satuan && hargaSatuan) {
        // Cari atau buat satuan
        let satuanRecord = await this.prisma.satuan.findFirst({
          where: { nama: satuan },
        });

        if (!satuanRecord) {
          satuanRecord = await this.prisma.satuan.create({
            data: { nama: satuan },
          });
        }

        // Cek apakah komponen dengan uraian yang sama sudah ada pada item kegiatan yang sama
        const existingKomponen = await this.prisma.komponen_ASB.findFirst({
          where: {
            uraian,
            id_item_kegiatan_asb: currentItemKegiatanId!,
            deletedAt: null,
          },
        });

        if (!existingKomponen) {
          await this.prisma.komponen_ASB.create({
            data: {
              uraian,
              id_item_kegiatan_asb: currentItemKegiatanId!,
              id_satuan: satuanRecord.id,
              koefisien: koefisien.toString(),
              harga_satuan: hargaSatuan.toString(),
              jumlah_harga: jumlahHarga.toString(),
            },
          });
        }
      }

    }

    return successResponse('Import selesai', null);
  }



}
