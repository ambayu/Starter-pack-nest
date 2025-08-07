import { Module } from '@nestjs/common';
import { KelompokHspkService } from './kelompok-hspk.service';
import { KelompokHspkController } from './kelompok-hspk.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [KelompokHspkController],
  providers: [KelompokHspkService],
  imports: [PrismaModule],
})
export class KelompokHspkModule { }
