import { Module } from '@nestjs/common';
import { SubKegiatanHspkService } from './sub-kegiatan-hspk.service';
import { SubKegiatanHspkController } from './sub-kegiatan-hspk.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SubKegiatanHspkController],
  providers: [SubKegiatanHspkService],
  imports: [PrismaModule],
})
export class SubKegiatanHspkModule { }
