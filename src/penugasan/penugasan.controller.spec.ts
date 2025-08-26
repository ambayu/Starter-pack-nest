import { Test, TestingModule } from '@nestjs/testing';
import { PenugasanController } from './penugasan.controller';
import { PenugasanService } from './penugasan.service';

describe('PenugasanController', () => {
  let controller: PenugasanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PenugasanController],
      providers: [PenugasanService],
    }).compile();

    controller = module.get<PenugasanController>(PenugasanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
