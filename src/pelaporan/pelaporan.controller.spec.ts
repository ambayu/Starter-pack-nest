import { Test, TestingModule } from '@nestjs/testing';
import { PelaporanController } from './pelaporan.controller';
import { PelaporanService } from './pelaporan.service';

describe('PelaporanController', () => {
  let controller: PelaporanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PelaporanController],
      providers: [PelaporanService],
    }).compile();

    controller = module.get<PelaporanController>(PelaporanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
