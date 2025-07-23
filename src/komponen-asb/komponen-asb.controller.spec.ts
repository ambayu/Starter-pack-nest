import { Test, TestingModule } from '@nestjs/testing';
import { KomponenAsbController } from './komponen-asb.controller';
import { KomponenAsbService } from './komponen-asb.service';

describe('KomponenAsbController', () => {
  let controller: KomponenAsbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KomponenAsbController],
      providers: [KomponenAsbService],
    }).compile();

    controller = module.get<KomponenAsbController>(KomponenAsbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
