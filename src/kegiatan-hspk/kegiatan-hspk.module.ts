import { Module } from '@nestjs/common';
import { KegiatanHspkService } from './kegiatan-hspk.service';
import { KegiatanHspkController } from './kegiatan-hspk.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [KegiatanHspkController],
  providers: [KegiatanHspkService],
  imports: [PrismaModule],
})
export class KegiatanHspkModule {}
