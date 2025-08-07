import { Test, TestingModule } from '@nestjs/testing';
import { KelompokHspkController } from './kelompok-hspk.controller';
import { KelompokHspkService } from './kelompok-hspk.service';

describe('KelompokHspkController', () => {
  let controller: KelompokHspkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KelompokHspkController],
      providers: [KelompokHspkService],
    }).compile();

    controller = module.get<KelompokHspkController>(KelompokHspkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
