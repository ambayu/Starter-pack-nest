import { Module } from '@nestjs/common';
import { SatuanService } from './satuan.service';
import { SatuanController } from './satuan.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SatuanController],
  providers: [SatuanService],
  imports: [PrismaModule], // Assuming PrismaModule is imported here for database access
})
export class SatuanModule {}
