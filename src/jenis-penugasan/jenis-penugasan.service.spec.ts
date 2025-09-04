import { Test, TestingModule } from '@nestjs/testing';
import { JenisPenugasanService } from './jenis-penugasan.service';

describe('JenisPenugasanService', () => {
  let service: JenisPenugasanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JenisPenugasanService],
    }).compile();

    service = module.get<JenisPenugasanService>(JenisPenugasanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
