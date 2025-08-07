import { Test, TestingModule } from '@nestjs/testing';
import { KegiatanHspkService } from './kegiatan-hspk.service';

describe('KegiatanHspkService', () => {
  let service: KegiatanHspkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KegiatanHspkService],
    }).compile();

    service = module.get<KegiatanHspkService>(KegiatanHspkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
