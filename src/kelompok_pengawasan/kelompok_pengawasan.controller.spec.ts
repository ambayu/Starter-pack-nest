import { Test, TestingModule } from '@nestjs/testing';
import { KelompokPengawasanController } from './kelompok_pengawasan.controller';
import { KelompokPengawasanService } from './kelompok_pengawasan.service';

describe('KelompokPengawasanController', () => {
  let controller: KelompokPengawasanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KelompokPengawasanController],
      providers: [KelompokPengawasanService],
    }).compile();

    controller = module.get<KelompokPengawasanController>(KelompokPengawasanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
