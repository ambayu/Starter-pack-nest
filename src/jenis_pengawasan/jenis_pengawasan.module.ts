import { Module } from '@nestjs/common';
import { JenisPengawasanService } from './jenis_pengawasan.service';
import { JenisPengawasanController } from './jenis_pengawasan.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [JenisPengawasanController],
  providers: [JenisPengawasanService],
  imports: [PrismaModule],
})
export class JenisPengawasanModule {}
