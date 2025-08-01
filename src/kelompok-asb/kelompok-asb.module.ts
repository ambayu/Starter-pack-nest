import { Module } from '@nestjs/common';
import { KelompokAsbService } from './kelompok-asb.service';
import { KelompokAsbController } from './kelompok-asb.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [KelompokAsbController],
  providers: [KelompokAsbService],
  imports: [PrismaModule],
})
export class KelompokAsbModule { }
