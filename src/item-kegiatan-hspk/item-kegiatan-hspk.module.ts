import { Module } from '@nestjs/common';
import { ItemKegiatanHspkService } from './item-kegiatan-hspk.service';
import { ItemKegiatanHspkController } from './item-kegiatan-hspk.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ItemKegiatanHspkController],
  providers: [ItemKegiatanHspkService],
  imports: [PrismaModule],
})
export class ItemKegiatanHspkModule { }
