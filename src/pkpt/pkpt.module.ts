import { Module } from '@nestjs/common';
import { PkptService } from './pkpt.service';
import { PkptController } from './pkpt.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PkptController],
  providers: [PkptService],
  imports: [PrismaModule],
})
export class PkptModule {}
