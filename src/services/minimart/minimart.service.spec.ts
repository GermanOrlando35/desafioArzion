import { Test, TestingModule } from '@nestjs/testing';
import { MinimartService } from './minimart.service';

describe('MinimartService', () => {
  let service: MinimartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinimartService],
    }).compile();

    service = module.get<MinimartService>(MinimartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
