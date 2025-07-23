import { Test, TestingModule } from '@nestjs/testing';
import { KegiatanAsbService } from './kegiatan-asb.service';

describe('KegiatanAsbService', () => {
  let service: KegiatanAsbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KegiatanAsbService],
    }).compile();

    service = module.get<KegiatanAsbService>(KegiatanAsbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
