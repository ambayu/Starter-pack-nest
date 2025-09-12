import { Test, TestingModule } from '@nestjs/testing';
import { JenisPengawasanService } from './jenis_pengawasan.service';

describe('JenisPengawasanService', () => {
  let service: JenisPengawasanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JenisPengawasanService],
    }).compile();

    service = module.get<JenisPengawasanService>(JenisPengawasanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
