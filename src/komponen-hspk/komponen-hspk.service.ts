import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKomponenHspkDto } from './dto/create-komponen-hspk.dto';
import { UpdateKomponenHspkDto } from './dto/update-komponen-hspk.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';
import * as XLSX from 'xlsx';

@Injectable()
export class KomponenHspkService {
  constructor(private prisma: PrismaService) { }
  async create(data: CreateKomponenHspkDto) {
    const q = await this.prisma.komponen_HSPK.create({
      data: {
        uraian: data.uraian,
        id_item_kegiatan_HSPK: data.id_item_kegiatan_HSPK,
        id_satuan: data.id_satuan,
        koefisien: data.koefisien.toString(),
        harga_satuan: data.harga_satuan.toString(),
        jumlah_harga: data.jumlah_harga.toString(),
      },
    });

    return successResponse('Komponen HSPK berhasil dibuat', q);
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
          item_kegiatan_HSPK: {
            sub_kegiatan_HSPK: {
              kegiatan_HSPK: {
                kelompok_HSPK: {
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
      this.prisma.komponen_HSPK.findMany({
        where,
        skip,
        take: perPage,
        include: {
          item_kegiatan_HSPK: {
            include: {
              sub_kegiatan_HSPK: {
                include: {
                  kegiatan_HSPK: {
                    include: {
                      kelompok_HSPK: true,
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
      this.prisma.komponen_HSPK.count({ where }),
    ]);

    return successResponse("Berhasil mendapatkan semua komponen HSPK", {
      data,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  }


  async findOne(id: number) {
    const findId = await this.prisma.komponen_HSPK.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException(
        `Komponen HSPK dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.komponen_HSPK.findUnique({
      where: { id, deletedAt: null },
      include: {
        satuan: true,
      },
    });
    return successResponse(
      `Berhasil mendapatkan komponen HSPK dengan ID ${id}`,
      q,
    );
  }

  async update(id: number, data: UpdateKomponenHspkDto) {
    const findId = await this.prisma.komponen_HSPK.findUnique({
      where: { id, deletedAt: null },
    });
    if (!findId) {
      throw new BadRequestException(
        `Komponen HSPK dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.komponen_HSPK.update({
      where: { id },
      data: {
        id_item_kegiatan_HSPK: data.id_item_kegiatan_HSPK,
        uraian: data.uraian,
        id_satuan: data.id_satuan,
        koefisien: data.koefisien?.toString(),
        harga_satuan: data.harga_satuan?.toString(),
        jumlah_harga: data.jumlah_harga?.toString(),
      },
    });

    return successResponse(
      `Berhasil memperbarui komponen HSPK dengan ID ${id}`,
      q,
    );
  }

  async remove(id: number) {
    const findId = await this.prisma.komponen_HSPK.findUnique({
      where: { id },
    });
    if (!findId) {
      throw new BadRequestException(
        `Komponen HSPK dengan ID ${id} tidak ditemukan`,
      );
    }
    const q = await this.prisma.komponen_HSPK.delete({
      where: { id },
    });

    return successResponse(
      `Berhasil menghapus komponen HSPK dengan ID ${id}`,
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
      const kodeHSPK = (row[0] || '').toString().trim();
      const uraian = (row[1] || '').toString().trim();
      const satuan = (row[2] || '').toString().trim();
      const koefisien = row[3];
      const hargaSatuan = row[4];
      const jumlahHarga = row[5];

      const hasDot = kodeHSPK.includes('.');

      // 1. Kelompok_HSPK
      if (kodeHSPK && !hasDot) {
        const kelompok = await this.prisma.kelompok_HSPK.findFirst({
          where: { kode: kodeHSPK },
        });

        if (!kelompok) {
          const created = await this.prisma.kelompok_HSPK.create({
            data: {
              kode: kodeHSPK,
              uraian,
            },
          });
          currentKelompokId = created.id;
        } else {

          currentKelompokId = kelompok.id;
        }

        continue;
      }

      // 2. Kegiatan_HSPK (punya titik, tidak punya satuan)
      if (kodeHSPK && hasDot && !satuan) {
        const kodeKegiatan = kodeHSPK.split('.').slice(1).join('.'); // bagian setelah titik pertama

        const kegiatan = await this.prisma.kegiatan_HSPK.findFirst({
          where: {
            kode: kodeKegiatan,
            id_kelompok_HSPK: currentKelompokId ?? undefined,
          },
        });

        if (!kegiatan) {
          const created = await this.prisma.kegiatan_HSPK.create({
            data: {
              kode: kodeKegiatan,
              uraian,
              id_kelompok_HSPK: currentKelompokId ?? undefined,
            },
          });
          currentKegiatanId = created.id;
        } else {
          currentKegiatanId = kegiatan.id;
        }

        continue;
      }

      // 3. SubKegiatan_HSPK (punya titik dan punya satuan)
      if (kodeHSPK && hasDot && satuan) {
        const kodeSubKegiatan = kodeHSPK.split('.').slice(1).join('.');

        const sub = await this.prisma.subKegiatan_HSPK.findFirst({
          where: {
            kode: kodeSubKegiatan,
            id_kegiatan_HSPK: currentKegiatanId ?? undefined,
          },
        });

        if (!sub) {
          const created = await this.prisma.subKegiatan_HSPK.create({
            data: {
              kode: kodeSubKegiatan,
              uraian,
              id_kegiatan_HSPK: currentKegiatanId!,
              id_kelompok_HSPK: currentKelompokId ?? undefined,
            },
          });
          currentSubKegiatanId = created.id;
        } else {
          currentSubKegiatanId = sub.id;
        }

        // Buat 1 itemKegiatan jika belum ada
        const item = await this.prisma.itemKegiatanHSPK.findFirst({
          where: {
            id_sub_kegiatan_HSPK: currentSubKegiatanId,
            deletedAt: null,
          },
        });

        if (!item) {
          const created = await this.prisma.itemKegiatanHSPK.create({
            data: {
              uraian: 'Auto Generated Item Kegiatan',
              id_sub_kegiatan_HSPK: currentSubKegiatanId,
            },
          });
          currentItemKegiatanId = created.id;
        } else {
          currentItemKegiatanId = item.id;
        }

        continue;
      }

      // 4. Item Kegiatan (tidak ada kode dan satuan)
      if (!kodeHSPK && !satuan && uraian) {
        // Cek apakah uraian item sudah ada dalam sub kegiatan tersebut
        const existingItem = await this.prisma.itemKegiatanHSPK.findFirst({
          where: {
            uraian: uraian,
            id_sub_kegiatan_HSPK: currentSubKegiatanId!,
            deletedAt: null,
          },
        });

        if (!existingItem) {
          const item = await this.prisma.itemKegiatanHSPK.create({
            data: {
              uraian,
              id_sub_kegiatan_HSPK: currentSubKegiatanId!,
            },
          });
          currentItemKegiatanId = item.id;
        } else {
          currentItemKegiatanId = existingItem.id;
        }

        continue;
      }


      // 5. Komponen_Hspk (baris dengan satuan & nilai-nilai lainnya)
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
        const existingKomponen = await this.prisma.komponen_HSPK.findFirst({
          where: {
            uraian,
            id_item_kegiatan_HSPK: currentItemKegiatanId!,
            deletedAt: null,
          },
        });

        if (!existingKomponen) {
          await this.prisma.komponen_HSPK.create({
            data: {
              uraian,
              id_item_kegiatan_HSPK: currentItemKegiatanId!,
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
