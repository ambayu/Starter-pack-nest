import { Test, TestingModule } from '@nestjs/testing';
import { HargaReferensiService } from './harga-referensi.service';

describe('HargaReferensiService', () => {
  let service: HargaReferensiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HargaReferensiService],
    }).compile();

    service = module.get<HargaReferensiService>(HargaReferensiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
