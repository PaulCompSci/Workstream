import { Test, TestingModule } from '@nestjs/testing';
import { BlackListedPhnumberService } from './black-listed-phnumber.service';

describe('BlackListedPhnumberService', () => {
  let service: BlackListedPhnumberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlackListedPhnumberService],
    }).compile();

    service = module.get<BlackListedPhnumberService>(BlackListedPhnumberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
