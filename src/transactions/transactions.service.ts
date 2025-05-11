import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { ConfigService } from '@nestjs/config';
import { create } from 'domain';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import { parse } from 'path';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
    private config: ConfigService
  ) {
  }
  async create(createTransactionDto: CreateTransactionDto) {
    /* console.log('DTO:', createTransactionDto);
    return await this.db.insert(schema.transactions).values(createTransactionDto).returning({ id: schema.transactions.id }); */
    const { installmentsCount, firstDueDate, ...transaction } = createTransactionDto;

    const [newTransaction] = await this.db.insert(schema.transactions).values(transaction).returning({ id: schema.transactions.id });
    if (!installmentsCount || !firstDueDate) {
      return newTransaction;
    }
    const installments = Array.from({ length: installmentsCount }).map((_, i) => ({
      transactionId: newTransaction.id,
      number: i + 1,
      amount: (parseFloat(transaction.amount) / installmentsCount).toFixed(2),
      dueDate: this.addMonths(firstDueDate, i),
    }))

    await this.db.insert(schema.installments).values(installments)

  }

  async findAll() {
    return await this.db.select().from(schema.transactions);
  }

  findOne(id: string) {
    return this.db.select().from(schema.transactions).where(eq(schema.transactions.id, id)).limit(1);

  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.db.update(schema.transactions).set(updateTransactionDto).where(eq(schema.transactions.id, id)).returning({ id: schema.transactions.id });
    //return `This action updates a #${id} transaction`;
  }

  remove(id: string) {
    return this.db.delete(schema.transactions).where(eq(schema.transactions.id, id)).returning({ id: schema.transactions.id });
    //return `This action removes a #${id} transaction`;
  }

  addMonths(baseDate: string, months: number): string {
    const date = new Date(baseDate);
    date.setMonth(date.getMonth() + months);
    return date.toISOString().split('T')[0];
  }
}
