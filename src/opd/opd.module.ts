import { Module } from '@nestjs/common';
import { OpdService } from './opd.service';
import { OpdController } from './opd.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OpdController],
  providers: [OpdService],
})
export class OpdModule {}
