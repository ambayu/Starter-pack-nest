import { Test, TestingModule } from '@nestjs/testing';
import { KelompokHspkService } from './kelompok-hspk.service';

describe('KelompokHspkService', () => {
  let service: KelompokHspkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KelompokHspkService],
    }).compile();

    service = module.get<KelompokHspkService>(KelompokHspkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
