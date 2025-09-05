import { Test, TestingModule } from '@nestjs/testing';
import { PelaksanaService } from './pelaksana.service';

describe('PelaksanaService', () => {
  let service: PelaksanaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PelaksanaService],
    }).compile();

    service = module.get<PelaksanaService>(PelaksanaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
