import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {

    constructor(
        @Inject(DrizzleAsyncProvider)
        private db: NodePgDatabase<typeof schema>,
        private config: ConfigService
    ) {

    }
    async create(createUserDto: CreateUserDto) {
        return await this.db.insert(schema.users).values(createUserDto).returning({ id: schema.users.id });
    }
    async findAll() {
        console.log(this.config.get<string>('DATABASE_URL'));
        return await this.db.select().from(schema.users);
    }
    async findOne(arg0: number) {
        throw new Error('Method not implemented.');
    }
    async update(arg0: number, updateUserDto: UpdateUserDto) {
        throw new Error('Method not implemented.');
    }
    async remove(arg0: number) {
        throw new Error('Method not implemented.');
    }

}
