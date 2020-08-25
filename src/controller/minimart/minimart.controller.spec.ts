import { Test, TestingModule } from '@nestjs/testing';
import { MinimartController } from './minimart.controller';

describe('MinimartController', () => {
  let controller: MinimartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinimartController],
    }).compile();

    controller = module.get<MinimartController>(MinimartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
