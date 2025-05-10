import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { TransactionCategoriesModule } from './transaction-categories/transaction-categories.module';
import { TransactionGroupsModule } from './transaction-groups/transaction-groups.module';
import { TransactionsModule } from './transactions/transactions.module';
import { PayslipsModule } from './payslips/payslips.module';
import { InstallmentsModule } from './installments/installments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true, }),
    DrizzleModule,
    UserModule,
    TransactionCategoriesModule,
    TransactionGroupsModule,
    TransactionsModule,
    PayslipsModule,
    InstallmentsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
