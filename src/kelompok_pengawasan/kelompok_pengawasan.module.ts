import { Module } from '@nestjs/common';
import { KelompokPengawasanService } from './kelompok_pengawasan.service';
import { KelompokPengawasanController } from './kelompok_pengawasan.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [KelompokPengawasanController],
  providers: [KelompokPengawasanService],
  imports: [PrismaModule],
})
export class KelompokPengawasanModule {}
