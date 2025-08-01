import { Test, TestingModule } from '@nestjs/testing';
import { KelompokAsbController } from './kelompok-asb.controller';
import { KelompokAsbService } from './kelompok-asb.service';

describe('KelompokAsbController', () => {
  let controller: KelompokAsbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KelompokAsbController],
      providers: [KelompokAsbService],
    }).compile();

    controller = module.get<KelompokAsbController>(KelompokAsbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
