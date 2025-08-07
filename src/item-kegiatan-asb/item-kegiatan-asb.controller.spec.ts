import { Test, TestingModule } from '@nestjs/testing';
import { ItemKegiatanAsbController } from './item-kegiatan-asb.controller';
import { ItemKegiatanAsbService } from './item-kegiatan-asb.service';

describe('ItemKegiatanAsbController', () => {
  let controller: ItemKegiatanAsbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemKegiatanAsbController],
      providers: [ItemKegiatanAsbService],
    }).compile();

    controller = module.get<ItemKegiatanAsbController>(ItemKegiatanAsbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
