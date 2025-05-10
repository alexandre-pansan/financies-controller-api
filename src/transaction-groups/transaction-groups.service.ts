import { Injectable } from '@nestjs/common';
import { CreateTransactionGroupDto } from './dto/create-transaction-group.dto';
import { UpdateTransactionGroupDto } from './dto/update-transaction-group.dto';

@Injectable()
export class TransactionGroupsService {
  create(createTransactionGroupDto: CreateTransactionGroupDto) {
    return 'This action adds a new transactionGroup';
  }

  findAll() {
    return `This action returns all transactionGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transactionGroup`;
  }

  update(id: number, updateTransactionGroupDto: UpdateTransactionGroupDto) {
    return `This action updates a #${id} transactionGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionGroup`;
  }
}
