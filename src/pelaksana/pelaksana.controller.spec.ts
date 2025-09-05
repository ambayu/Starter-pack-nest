import { Test, TestingModule } from '@nestjs/testing';
import { PelaksanaController } from './pelaksana.controller';
import { PelaksanaService } from './pelaksana.service';

describe('PelaksanaController', () => {
  let controller: PelaksanaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PelaksanaController],
      providers: [PelaksanaService],
    }).compile();

    controller = module.get<PelaksanaController>(PelaksanaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
