import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PeranSeederService {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    const peran = [
      { nama: 'Penanggung Jawab' },
      { nama: 'Pembantu Penanggung Jawab' },
      { nama: 'Pengendali Teknis' },
      { nama: 'Ketua Tim' },
      { nama: 'Anggota Tim' },
    ];

    for (const p of peran) {
      try {
        await this.prisma.peran.upsert({
          where: { nama: p.nama },
          update: {},
          create: {
            nama: p.nama,
          },
        });
        console.log(`Processed: ${p.nama} `);
      } catch (err) {
        console.error(`Error pelaksana ${p.nama}:`, err);
      }
    }
  }
}
