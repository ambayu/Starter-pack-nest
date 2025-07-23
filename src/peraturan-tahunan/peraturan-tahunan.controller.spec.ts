import { Test, TestingModule } from '@nestjs/testing';
import { PeraturanTahunanController } from './peraturan-tahunan.controller';
import { PeraturanTahunanService } from './peraturan-tahunan.service';

describe('PeraturanTahunanController', () => {
  let controller: PeraturanTahunanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeraturanTahunanController],
      providers: [PeraturanTahunanService],
    }).compile();

    controller = module.get<PeraturanTahunanController>(PeraturanTahunanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
