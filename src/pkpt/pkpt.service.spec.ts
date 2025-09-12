import { Test, TestingModule } from '@nestjs/testing';
import { PkptService } from './pkpt.service';

describe('PkptService', () => {
  let service: PkptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PkptService],
    }).compile();

    service = module.get<PkptService>(PkptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
