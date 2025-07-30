import { Module } from '@nestjs/common';
import { SubKegiatanAsbService } from './sub-kegiatan-asb.service';
import { SubKegiatanAsbController } from './sub-kegiatan-asb.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SubKegiatanAsbController],
  providers: [SubKegiatanAsbService],
  imports: [PrismaModule],
})
export class SubKegiatanAsbModule {}
