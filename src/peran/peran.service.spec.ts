import { Test, TestingModule } from '@nestjs/testing';
import { PeranService } from './peran.service';

describe('PeranService', () => {
  let service: PeranService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeranService],
    }).compile();

    service = module.get<PeranService>(PeranService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
