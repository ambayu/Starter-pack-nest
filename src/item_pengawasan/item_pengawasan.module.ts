import { Module } from '@nestjs/common';
import { ItemPengawasanService } from './item_pengawasan.service';
import { ItemPengawasanController } from './item_pengawasan.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ItemPengawasanController],
  providers: [ItemPengawasanService],
  imports: [PrismaModule],
})
export class ItemPengawasanModule { }
