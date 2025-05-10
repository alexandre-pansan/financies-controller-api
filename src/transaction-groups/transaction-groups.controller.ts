import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionGroupsService } from './transaction-groups.service';
import { CreateTransactionGroupDto } from './dto/create-transaction-group.dto';
import { UpdateTransactionGroupDto } from './dto/update-transaction-group.dto';

@Controller('transaction-groups')
export class TransactionGroupsController {
  constructor(private readonly transactionGroupsService: TransactionGroupsService) {}

  @Post()
  create(@Body() createTransactionGroupDto: CreateTransactionGroupDto) {
    return this.transactionGroupsService.create(createTransactionGroupDto);
  }

  @Get()
  findAll() {
    return this.transactionGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionGroupDto: UpdateTransactionGroupDto) {
    return this.transactionGroupsService.update(+id, updateTransactionGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionGroupsService.remove(+id);
  }
}
