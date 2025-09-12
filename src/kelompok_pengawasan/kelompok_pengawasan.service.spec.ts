import { Test, TestingModule } from '@nestjs/testing';
import { KelompokPengawasanService } from './kelompok_pengawasan.service';

describe('KelompokPengawasanService', () => {
  let service: KelompokPengawasanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KelompokPengawasanService],
    }).compile();

    service = module.get<KelompokPengawasanService>(KelompokPengawasanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
