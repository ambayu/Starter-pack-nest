import { Test, TestingModule } from '@nestjs/testing';
import { ItemKegiatanHspkController } from './item-kegiatan-hspk.controller';
import { ItemKegiatanHspkService } from './item-kegiatan-hspk.service';

describe('ItemKegiatanHspkController', () => {
  let controller: ItemKegiatanHspkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemKegiatanHspkController],
      providers: [ItemKegiatanHspkService],
    }).compile();

    controller = module.get<ItemKegiatanHspkController>(ItemKegiatanHspkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
