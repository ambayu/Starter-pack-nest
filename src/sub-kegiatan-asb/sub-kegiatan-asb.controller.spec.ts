import { Test, TestingModule } from '@nestjs/testing';
import { SubKegiatanAsbController } from './sub-kegiatan-asb.controller';
import { SubKegiatanAsbService } from './sub-kegiatan-asb.service';

describe('SubKegiatanAsbController', () => {
  let controller: SubKegiatanAsbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubKegiatanAsbController],
      providers: [SubKegiatanAsbService],
    }).compile();

    controller = module.get<SubKegiatanAsbController>(SubKegiatanAsbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
