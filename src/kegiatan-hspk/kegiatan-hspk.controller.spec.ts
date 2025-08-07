import { Test, TestingModule } from '@nestjs/testing';
import { KegiatanHspkController } from './kegiatan-hspk.controller';
import { KegiatanHspkService } from './kegiatan-hspk.service';

describe('KegiatanHspkController', () => {
  let controller: KegiatanHspkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KegiatanHspkController],
      providers: [KegiatanHspkService],
    }).compile();

    controller = module.get<KegiatanHspkController>(KegiatanHspkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
