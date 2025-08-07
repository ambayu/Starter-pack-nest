import { Test, TestingModule } from '@nestjs/testing';
import { SubKegiatanHspkService } from './sub-kegiatan-hspk.service';

describe('SubKegiatanHspkService', () => {
  let service: SubKegiatanHspkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubKegiatanHspkService],
    }).compile();

    service = module.get<SubKegiatanHspkService>(SubKegiatanHspkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
