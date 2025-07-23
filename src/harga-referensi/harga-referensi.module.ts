import { Module } from '@nestjs/common';
import { HargaReferensiService } from './harga-referensi.service';
import { HargaReferensiController } from './harga-referensi.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  controllers: [HargaReferensiController],
  providers: [HargaReferensiService],
  imports: [PrismaModule], // Assuming PrismaModule is imported here for database access
})
export class HargaReferensiModule {}
