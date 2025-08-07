import { Test, TestingModule } from '@nestjs/testing';
import { ItemKegiatanHspkService } from './item-kegiatan-hspk.service';

describe('ItemKegiatanHspkService', () => {
  let service: ItemKegiatanHspkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemKegiatanHspkService],
    }).compile();

    service = module.get<ItemKegiatanHspkService>(ItemKegiatanHspkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
