import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { eq } from 'drizzle-orm';

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
        //console.log(this.config.get<string>('DATABASE_URL'));
        return await this.db.select().from(schema.users);
    }
    async findOne(arg0: string) {
        const user = await this.db.select().from(schema.users).where(eq(schema.users.email, arg0)).limit(1);
        if (!user[0]) {
            return null;
        }
        //Forces user to return a single item
        return user.find((user) => user.email === arg0);
    }
    async update(arg0: string, updateUserDto: UpdateUserDto) {
        throw new Error('Method not implemented.');
    }
    async remove(arg0: string) {
        throw new Error('Method not implemented.');
    }

}
