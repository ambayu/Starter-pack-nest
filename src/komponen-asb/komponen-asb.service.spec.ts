import { Test, TestingModule } from '@nestjs/testing';
import { KomponenAsbService } from './komponen-asb.service';

describe('KomponenAsbService', () => {
  let service: KomponenAsbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KomponenAsbService],
    }).compile();

    service = module.get<KomponenAsbService>(KomponenAsbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
