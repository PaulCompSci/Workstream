import { Test, TestingModule } from '@nestjs/testing';
import { BlackListedPhnumberController } from './black-listed-phnumber.controller';
import { BlackListedPhnumberService } from './black-listed-phnumber.service';

describe('BlackListedPhnumberController', () => {
  let controller: BlackListedPhnumberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlackListedPhnumberController],
      providers: [BlackListedPhnumberService],
    }).compile();

    controller = module.get<BlackListedPhnumberController>(BlackListedPhnumberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
