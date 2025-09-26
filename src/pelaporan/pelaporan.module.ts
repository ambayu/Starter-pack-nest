import { Module } from '@nestjs/common';
import { PelaporanService } from './pelaporan.service';
import { PelaporanController } from './pelaporan.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PelaporanController],
  providers: [PelaporanService],
  imports: [PrismaModule],
})
export class PelaporanModule {}
