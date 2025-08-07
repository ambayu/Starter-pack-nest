import { Module } from '@nestjs/common';
import { KomponenHspkService } from './komponen-hspk.service';
import { KomponenHspkController } from './komponen-hspk.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [KomponenHspkController],
  providers: [KomponenHspkService],
  imports: [PrismaModule],
})
export class KomponenHspkModule {}
