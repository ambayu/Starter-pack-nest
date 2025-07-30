import { Test, TestingModule } from '@nestjs/testing';
import { SubKegiatanAsbService } from './sub-kegiatan-asb.service';

describe('SubKegiatanAsbService', () => {
  let service: SubKegiatanAsbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubKegiatanAsbService],
    }).compile();

    service = module.get<SubKegiatanAsbService>(SubKegiatanAsbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
