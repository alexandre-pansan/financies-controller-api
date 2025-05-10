import { Module } from '@nestjs/common';
import { TransactionGroupsService } from './transaction-groups.service';
import { TransactionGroupsController } from './transaction-groups.controller';

@Module({
  controllers: [TransactionGroupsController],
  providers: [TransactionGroupsService],
})
export class TransactionGroupsModule {}
