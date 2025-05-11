import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [DrizzleModule],
})
export class TransactionsModule { }
