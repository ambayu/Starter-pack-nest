import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StatusSeederService {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    const statuses = [
      { id: 1, name: 'Pembuatan Penugasan' },
      { id: 2, name: 'Menunggu Respon Katim' },
      { id: 3, name: 'Sedang Dalam Pengerjaan Katim' },
      { id: 4, name: 'Proses Penandatanganan Rute Perencanaan' },
      { id: 5, name: 'Penugasan menuju Bagian Umum' },
      { id: 6, name: 'Penandatanganan ditolak' },
      { id: 7, name: 'Penomoran oleh Kasubag Umum' },
      { id: 8, name: 'Upload ST oleh Katim' },
    ];

    for (const s of statuses) {
      try {
        await this.prisma.status.upsert({
          where: { id: s.id },
          update: { name: s.name },
          create: {
            id: s.id, // kita set manual biar sesuai mapping status
            name: s.name,
          },
        });
        console.log(`Processed status: [${s.id}] ${s.name}`);
      } catch (err) {
        console.error(`Error status ${s.name}:`, err);
      }
    }
  }
}
