import { Test, TestingModule } from '@nestjs/testing';
import { PeranController } from './peran.controller';
import { PeranService } from './peran.service';

describe('PeranController', () => {
  let controller: PeranController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeranController],
      providers: [PeranService],
    }).compile();

    controller = module.get<PeranController>(PeranController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
