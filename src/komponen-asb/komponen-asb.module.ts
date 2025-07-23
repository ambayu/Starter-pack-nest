import { Module } from '@nestjs/common';
import { KomponenAsbService } from './komponen-asb.service';
import { KomponenAsbController } from './komponen-asb.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [KomponenAsbController],
  providers: [KomponenAsbService],
  imports: [PrismaModule], // Import any necessary modules here, e.g., PrismaModule if needed
})
export class KomponenAsbModule {}
