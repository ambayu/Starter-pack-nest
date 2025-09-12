import { Test, TestingModule } from '@nestjs/testing';
import { ItemPengawasanController } from './item_pengawasan.controller';
import { ItemPengawasanService } from './item_pengawasan.service';

describe('ItemPengawasanController', () => {
  let controller: ItemPengawasanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemPengawasanController],
      providers: [ItemPengawasanService],
    }).compile();

    controller = module.get<ItemPengawasanController>(ItemPengawasanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
