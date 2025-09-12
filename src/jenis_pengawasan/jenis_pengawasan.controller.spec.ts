import { Test, TestingModule } from '@nestjs/testing';
import { JenisPengawasanController } from './jenis_pengawasan.controller';
import { JenisPengawasanService } from './jenis_pengawasan.service';

describe('JenisPengawasanController', () => {
  let controller: JenisPengawasanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JenisPengawasanController],
      providers: [JenisPengawasanService],
    }).compile();

    controller = module.get<JenisPengawasanController>(JenisPengawasanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
