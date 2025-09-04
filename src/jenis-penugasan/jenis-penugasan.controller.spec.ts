import { Test, TestingModule } from '@nestjs/testing';
import { JenisPenugasanController } from './jenis-penugasan.controller';
import { JenisPenugasanService } from './jenis-penugasan.service';

describe('JenisPenugasanController', () => {
  let controller: JenisPenugasanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JenisPenugasanController],
      providers: [JenisPenugasanService],
    }).compile();

    controller = module.get<JenisPenugasanController>(JenisPenugasanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
