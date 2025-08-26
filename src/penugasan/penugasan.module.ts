import { Module } from '@nestjs/common';
import { PenugasanService } from './penugasan.service';
import { PenugasanController } from './penugasan.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PenugasanController],
  providers: [PenugasanService],
  imports: [PrismaModule]
})
export class PenugasanModule { }
