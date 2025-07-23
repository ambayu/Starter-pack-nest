import { Module } from '@nestjs/common';
import { PeraturanTahunanService } from './peraturan-tahunan.service';
import { PeraturanTahunanController } from './peraturan-tahunan.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PeraturanTahunanController],
  providers: [PeraturanTahunanService],
  imports: [PrismaModule], // Assuming PrismaModule is imported here for database access
})
export class PeraturanTahunanModule {}
