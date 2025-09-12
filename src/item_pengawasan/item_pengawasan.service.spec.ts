import { Test, TestingModule } from '@nestjs/testing';
import { ItemPengawasanService } from './item_pengawasan.service';

describe('ItemPengawasanService', () => {
  let service: ItemPengawasanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemPengawasanService],
    }).compile();

    service = module.get<ItemPengawasanService>(ItemPengawasanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
