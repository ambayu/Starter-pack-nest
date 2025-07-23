import { Test, TestingModule } from '@nestjs/testing';
import { HargaReferensiController } from './harga-referensi.controller';
import { HargaReferensiService } from './harga-referensi.service';

describe('HargaReferensiController', () => {
  let controller: HargaReferensiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HargaReferensiController],
      providers: [HargaReferensiService],
    }).compile();

    controller = module.get<HargaReferensiController>(HargaReferensiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
