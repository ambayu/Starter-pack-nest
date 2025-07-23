import { Test, TestingModule } from '@nestjs/testing';
import { KategoriKomponenController } from './kategori-komponen.controller';
import { KategoriKomponenService } from './kategori-komponen.service';

describe('KategoriKomponenController', () => {
  let controller: KategoriKomponenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KategoriKomponenController],
      providers: [KategoriKomponenService],
    }).compile();

    controller = module.get<KategoriKomponenController>(KategoriKomponenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
