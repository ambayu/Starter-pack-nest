import { Module } from '@nestjs/common';
import { PeranService } from './peran.service';
import { PeranController } from './peran.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PeranController],
  providers: [PeranService],
  imports: [PrismaModule],
})
export class PeranModule {}
