import { Module } from '@nestjs/common';
import { drizzleProvider, DrizzleAsyncProvider } from './drizzle.provider';

@Module({
    providers: [...drizzleProvider],
    exports: [DrizzleAsyncProvider],
})
export class DrizzleModule { }
