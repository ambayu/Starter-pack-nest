import { Test, TestingModule } from '@nestjs/testing';
import { KomponenHspkController } from './komponen-hspk.controller';
import { KomponenHspkService } from './komponen-hspk.service';

describe('KomponenHspkController', () => {
  let controller: KomponenHspkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KomponenHspkController],
      providers: [KomponenHspkService],
    }).compile();

    controller = module.get<KomponenHspkController>(KomponenHspkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
