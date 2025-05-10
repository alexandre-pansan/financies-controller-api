
import { eq } from 'drizzle-orm';
import { type NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import path from 'path';
import pg from 'pg';
import { exit } from 'process';

import * as schema from './schema';
import * as dotenv from 'dotenv';
dotenv.config({
    path: '.env',
});


const {
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME
} = process.env;

const DATABASE_URL = `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

(async () => {
    const pool = new pg.Pool({
        connectionString: DATABASE_URL,
    });
    let db: NodePgDatabase<typeof schema> | null = null;
    db = drizzle(pool, {
        schema: {
            ...schema,
        },
    });
    /*
        // Look for migrations in the src/drizzle/migrations folder
        const migrationPath = path.join(process.cwd(), 'src/drizzle/migrations');
    
        // Run the migrations
        await migrate(db, { migrationsFolder: migrationPath }); */

    // Insert default roles

    await db?.insert(schema.users).values({ name: 'Alexandre Pansan', email: "alexpjunior@terra.com.br", password: '123456' });

    console.log('Default user inserted');



    console.log('Migration complete');
    exit(0);
})();