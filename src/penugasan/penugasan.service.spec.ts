import { Test, TestingModule } from '@nestjs/testing';
import { PenugasanService } from './penugasan.service';

describe('PenugasanService', () => {
  let service: PenugasanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PenugasanService],
    }).compile();

    service = module.get<PenugasanService>(PenugasanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
