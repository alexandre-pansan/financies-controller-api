import { Inject, Injectable } from '@nestjs/common';
import { DrizzleAsyncProvider } from './drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './drizzle/schema'

@Injectable()
export class AppService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>
  ) {

  }
  getHello(): string {
    return 'Hello World!';
  }
}
