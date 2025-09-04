import { Module } from '@nestjs/common';
import { JenisPenugasanService } from './jenis-penugasan.service';
import { JenisPenugasanController } from './jenis-penugasan.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [JenisPenugasanController],
  providers: [JenisPenugasanService],
  imports: [PrismaModule],
})
export class JenisPenugasanModule {}
