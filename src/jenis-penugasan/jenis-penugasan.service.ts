import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJenisPenugasanDto } from './dto/create-jenis-penugasan.dto';
import { UpdateJenisPenugasanDto } from './dto/update-jenis-penugasan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class JenisPenugasanService {
  constructor(private prisma: PrismaService) { }
  async create(data: CreateJenisPenugasanDto) {
    const q = await this.prisma.jenisPenugasan.create({
      data: {
        jenis_penugasan: data.jenis_penugasan,
        id_pkpt: data.id_pkpt ?? null,
        non_pkpt: data.non_pkpt,
        createdBy: data.createdBy ?? '',
        Penugasan: {
          create:
          {
            dasar_penugasan: data.Penugasan?.dasar_penugasan,
            sifat_penugasan: data.Penugasan?.sifat_penugasan ?? '',
            nama_penugasan: data.Penugasan?.nama_penugasan ?? '',
            alamat_penugasan: data.Penugasan?.alamat_penugasan ?? '',
            nomor_kartu: data.Penugasan?.nomor_kartu ?? '',
            penanggung_jawab: data.Penugasan?.penanggung_jawab ?? '',
            pembantu_penanggung_jawab:
              data.Penugasan?.pembantu_penanggung_jawab ?? '',
            pengendali_teknis: data.Penugasan?.pengendali_teknis ?? '',
            ketua_tim: data.Penugasan?.ketua_tim ?? '',
            catatan: data.Penugasan?.catatan ?? '',
            susunan_tim: data.Penugasan?.susunan_tim
              ? {
                create: data.Penugasan.susunan_tim.map((r) => ({
                  id_peran: r.id_peran,
                  nip: r.nip,
                  satuan: r.satuan,
                  honorarium: r.honorarium,
                  alokasi_anggaran: r.alokasi_anggaran,
                })),
              }
              : undefined,
          }

        },
      },
      include: {
        Penugasan: {
          include: { rute_perencanaan: true, susunan_tim: true },
        },
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
      where.OR = [{ jenis_penugasan: { contains: search } }];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.jenisPenugasan.findMany({
        skip,
        take: perPage,
        include: {
          Penugasan: {
            include: {

              susunan_tim: true,
            },
          },
          pkpt: true,
        },
        orderBy: {
          [orderBy ? orderBy : 'createdAt']: order,
        },
      }),
      this.prisma.jenisPenugasan.count({ where }),
    ]);

    return successResponse('Penugasan ditemukan', {
      data,
      total,
      page,
      perPage,
    });
  }

  async findOne(id: number) {
    const findId = await this.prisma.jenisPenugasan.findUnique({
      where: { id },
      include: {
        Penugasan: {
          include: { rute_perencanaan: true, susunan_tim: true },
        },
      },
    });

    if (!findId) {
      throw new BadRequestException(
        `Penugasan dengan Id ${id} tidak ditemukan`,
      );
    }

    return successResponse('Penugasan ditemukan', findId);
  }

  async update(id: number, data: UpdateJenisPenugasanDto) {
    const findId = await this.prisma.jenisPenugasan.findUnique({
      where: { id },
    });

    if (!findId) {
      throw new BadRequestException(
        `Penugasan dengan Id ${id} tidak ditemukan`,
      );
    }

    const q = await this.prisma.jenisPenugasan.update({
      where: { id },
      data: {
        jenis_penugasan: data.jenis_penugasan,
        id_pkpt: data.id_pkpt ?? null,
        non_pkpt: data.non_pkpt,

        createdBy: data.createdBy ?? '',
        Penugasan: data.Penugasan
          ? {
            update: {
              where: { id: data.Penugasan.id },
              data: {
                dasar_penugasan: data.Penugasan.dasar_penugasan,
                sifat_penugasan: data.Penugasan.sifat_penugasan ?? '',
                nama_penugasan: data.Penugasan.nama_penugasan ?? '',
                alamat_penugasan: data.Penugasan.alamat_penugasan ?? '',
                nomor_kartu: data.Penugasan.nomor_kartu ?? '',
                penanggung_jawab: data.Penugasan.penanggung_jawab ?? '',
                pembantu_penanggung_jawab:
                  data.Penugasan.pembantu_penanggung_jawab ?? '',
                pengendali_teknis: data.Penugasan.pengendali_teknis ?? '',
                ketua_tim: data.Penugasan.ketua_tim ?? '',
                catatan: data.Penugasan.catatan ?? '',
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
            },
          }
          : undefined,
      },
      include: {
        Penugasan: {
          include: { rute_perencanaan: true },
        },
      },
    });

    return successResponse('Penugasan berhasil diperbaharui', q);
  }

  remove(id: number) {
    const findId = this.prisma.jenisPenugasan.findUnique({
      where: { id },
    });

    if (!findId) {
      throw new BadRequestException(
        `Penugasan dengan Id ${id} tidak ditemukan`,
      );
    }

    return this.prisma.jenisPenugasan.delete({
      where: { id },
    });
  }
}
