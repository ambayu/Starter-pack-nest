import { Test, TestingModule } from '@nestjs/testing';
import { ItemKegiatanAsbService } from './item-kegiatan-asb.service';

describe('ItemKegiatanAsbService', () => {
  let service: ItemKegiatanAsbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemKegiatanAsbService],
    }).compile();

    service = module.get<ItemKegiatanAsbService>(ItemKegiatanAsbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
