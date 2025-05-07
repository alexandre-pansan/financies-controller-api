import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default {
    schema: './src/drizzle/schema.ts',
    out: './src/drizzle/migrations',
    dialect: 'postgresql',

    dbCredentials: {
        // user: process.env.DATABASE_USER!,
        // password: process.env.DATABASE_PASSWORD!,
        // host: process.env.DATABASE_HOST!,
        // port: Number(process.env.DATABASE_PORT!),
        // database: process.env.DATABASE_NAME!,
        //url: `postgresql://${getEnv('DATABASE_USER')}:'${getEnv('DATABASE_PASSWORD')}'@${getEnv('DATABASE_HOST')}:${getEnv('DATABASE_PORT')}/${getEnv('DATABASE_NAME')}`,
        url: process.env.DATABASE_URL!,
    },
    verbose: true,
    strict: true,
} satisfies Config;

