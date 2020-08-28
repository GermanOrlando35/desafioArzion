import { Test, TestingModule } from '@nestjs/testing';
import { MinimartproductService } from './minimartproduct.service';

describe('MinimartproductService', () => {
  let service: MinimartproductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinimartproductService],
    }).compile();

    service = module.get<MinimartproductService>(MinimartproductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
