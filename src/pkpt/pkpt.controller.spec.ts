import { Test, TestingModule } from '@nestjs/testing';
import { PkptController } from './pkpt.controller';
import { PkptService } from './pkpt.service';

describe('PkptController', () => {
  let controller: PkptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PkptController],
      providers: [PkptService],
    }).compile();

    controller = module.get<PkptController>(PkptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
