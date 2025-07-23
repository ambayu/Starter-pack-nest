import { Test, TestingModule } from '@nestjs/testing';
import { KegiatanAsbController } from './kegiatan-asb.controller';
import { KegiatanAsbService } from './kegiatan-asb.service';

describe('KegiatanAsbController', () => {
  let controller: KegiatanAsbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KegiatanAsbController],
      providers: [KegiatanAsbService],
    }).compile();

    controller = module.get<KegiatanAsbController>(KegiatanAsbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
