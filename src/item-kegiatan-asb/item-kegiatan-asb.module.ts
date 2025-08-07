import { Module } from '@nestjs/common';
import { ItemKegiatanAsbService } from './item-kegiatan-asb.service';
import { ItemKegiatanAsbController } from './item-kegiatan-asb.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ItemKegiatanAsbController],
  providers: [ItemKegiatanAsbService],
  imports: [PrismaModule],
})
export class ItemKegiatanAsbModule { }
