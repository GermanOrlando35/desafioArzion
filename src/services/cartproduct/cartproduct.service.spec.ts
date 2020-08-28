import { Test, TestingModule } from '@nestjs/testing';
import { CartproductService } from './cartproduct.service';

describe('CartproductService', () => {
  let service: CartproductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartproductService],
    }).compile();

    service = module.get<CartproductService>(CartproductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
