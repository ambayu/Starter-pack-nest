import { Module } from '@nestjs/common';
import { KategoriKomponenService } from './kategori-komponen.service';
import { KategoriKomponenController } from './kategori-komponen.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [KategoriKomponenController],
  providers: [KategoriKomponenService],
  imports: [PrismaModule],
})
export class KategoriKomponenModule {}
