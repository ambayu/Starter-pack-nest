import { Test, TestingModule } from '@nestjs/testing';
import { SubKegiatanHspkController } from './sub-kegiatan-hspk.controller';
import { SubKegiatanHspkService } from './sub-kegiatan-hspk.service';

describe('SubKegiatanHspkController', () => {
  let controller: SubKegiatanHspkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubKegiatanHspkController],
      providers: [SubKegiatanHspkService],
    }).compile();

    controller = module.get<SubKegiatanHspkController>(SubKegiatanHspkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
