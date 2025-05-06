import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Test } from 'src/tables/test.model';

@Injectable()
export class TestService {
  constructor( 
    @InjectModel(Test)
    private testModel: typeof Test,
  ){

  }
  async create(test: CreateTestDto): Promise<Test> {
        return await this.testModel.create(test as Test);
  }

  findAll() {
    return this.testModel.findAll()
  }

  findOne(id: number) {
    return `This action returns a #${id} test`;
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
