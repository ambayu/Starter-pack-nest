import { Test, TestingModule } from '@nestjs/testing';
import { KelompokAsbService } from './kelompok-asb.service';

describe('KelompokAsbService', () => {
  let service: KelompokAsbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KelompokAsbService],
    }).compile();

    service = module.get<KelompokAsbService>(KelompokAsbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
