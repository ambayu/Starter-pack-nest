import { Test, TestingModule } from '@nestjs/testing';
import { KategoriKomponenService } from './kategori-komponen.service';

describe('KategoriKomponenService', () => {
  let service: KategoriKomponenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KategoriKomponenService],
    }).compile();

    service = module.get<KategoriKomponenService>(KategoriKomponenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
