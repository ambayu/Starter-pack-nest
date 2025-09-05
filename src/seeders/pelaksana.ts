import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PelaksanaSeederService {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    const pelaksana = [
      { kode: 'PJ', name: 'Penanggung Jawab' },
      { kode: 'PPJ', name: 'Pembantu Penanggung Jawab' },
      { kode: 'PT', name: 'Pengendali Teknis' },
      { kode: 'KT', name: 'Ketua Tim' },
      { kode: 'AT', name: 'Anggota Tim' },
    ];

for (const p of pelaksana) {
  try {
    await this.prisma.pelaksana.upsert({
      where: { kode: p.kode },
      update: {},
      create: {
        kode: p.kode,
        name: p.name,
      },
    });
    console.log(`Processed: ${p.kode} - ${p.name}`);
  } catch (err) {
    console.error(`Error pelaksana ${p.kode}:`, err);
  }
}

  }
}
