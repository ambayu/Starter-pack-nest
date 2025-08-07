import { Test, TestingModule } from '@nestjs/testing';
import { KomponenHspkService } from './komponen-hspk.service';

describe('KomponenHspkService', () => {
  let service: KomponenHspkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KomponenHspkService],
    }).compile();

    service = module.get<KomponenHspkService>(KomponenHspkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
