import { Module } from '@nestjs/common';
import { KegiatanAsbService } from './kegiatan-asb.service';
import { KegiatanAsbController } from './kegiatan-asb.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [KegiatanAsbController],
  providers: [KegiatanAsbService],
  imports: [PrismaModule],
})
export class KegiatanAsbModule {}
