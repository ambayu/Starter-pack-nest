import { Module } from '@nestjs/common';
import { PelaksanaService } from './pelaksana.service';
import { PelaksanaController } from './pelaksana.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PelaksanaController],
  providers: [PelaksanaService],
  imports: [PrismaModule],
})
export class PelaksanaModule {}
