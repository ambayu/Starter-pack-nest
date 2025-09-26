import { Test, TestingModule } from '@nestjs/testing';
import { PelaporanService } from './pelaporan.service';

describe('PelaporanService', () => {
  let service: PelaporanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PelaporanService],
    }).compile();

    service = module.get<PelaporanService>(PelaporanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
