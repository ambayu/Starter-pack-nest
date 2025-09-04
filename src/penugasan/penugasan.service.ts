import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdatePenugasanDto } from './dto/update-penugasan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';
import { CreatePenugasanDto } from 'src/jenis-penugasan/dto/create-penugasan.dto';

@Injectable()
export class PenugasanService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreatePenugasanDto) {
    //mulai dari km 01
    const findIdPenugasan = await this.prisma.penugasan.findFirst({
      where: {
        id: data.id,
      },
    });

    if (!findIdPenugasan) {
      throw new BadRequestException('Penugasan tidak ditemukan');
    }
    if (!data.km1) {
      throw new BadRequestException('Data km1 wajib diisi');
    }

    const q = await this.prisma.penugasan.update({
      where: { id: data.id },
      data: {
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
      },
    });

    return successResponse('Penugasan berhasil dibuat', data);
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
