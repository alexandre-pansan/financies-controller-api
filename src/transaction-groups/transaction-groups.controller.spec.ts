import { Test, TestingModule } from '@nestjs/testing';
import { TransactionGroupsController } from './transaction-groups.controller';
import { TransactionGroupsService } from './transaction-groups.service';

describe('TransactionGroupsController', () => {
  let controller: TransactionGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionGroupsController],
      providers: [TransactionGroupsService],
    }).compile();

    controller = module.get<TransactionGroupsController>(TransactionGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
