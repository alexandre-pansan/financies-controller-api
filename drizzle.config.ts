import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config({
    path: '.env',
});

export default {
    schema: './src/drizzle/schema.ts',
    out: './src/drizzle/migrations',
    dialect: 'postgresql',

    dbCredentials: {
        url: 'postgresql://postgres:123456@localhost:5432/studies',
    },
    verbose: true,
    strict: true,
} satisfies Config;