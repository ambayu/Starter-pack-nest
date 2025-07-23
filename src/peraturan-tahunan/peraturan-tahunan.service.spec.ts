import { Test, TestingModule } from '@nestjs/testing';
import { PeraturanTahunanService } from './peraturan-tahunan.service';

describe('PeraturanTahunanService', () => {
  let service: PeraturanTahunanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeraturanTahunanService],
    }).compile();

    service = module.get<PeraturanTahunanService>(PeraturanTahunanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
