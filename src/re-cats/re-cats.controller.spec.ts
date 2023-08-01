import { Test, TestingModule } from '@nestjs/testing';
import { ReCatsController } from './re-cats.controller';

describe('ReCatsController', () => {
  let controller: ReCatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReCatsController],
    }).compile();

    controller = module.get<ReCatsController>(ReCatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
