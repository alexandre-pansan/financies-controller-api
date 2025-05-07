
import { eq } from 'drizzle-orm';
import { type NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import path from 'path';
import pg from 'pg';
import { exit } from 'process';

import * as schema from './schema';

const {
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_SCHEMA
} = process.env;

const DATABASE_URL = `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_SCHEMA}`;

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

    // Look for migrations in the src/drizzle/migrations folder
    const migrationPath = path.join(process.cwd(), 'src/drizzle/migrations');

    // Run the migrations
    await migrate(db, { migrationsFolder: migrationPath });

    // Insert default roles
    for (const role of ['Super Admin', 'Admin', 'User', 'Guest']) {
        const existingUserRole = await db
            ?.select({
                name: schema.userRoles.name,
            })
            .from(schema.userRoles)
            .where(eq(schema.userRoles.name, role));
        if (!existingUserRole[0]) {
            await db?.insert(schema.userRoles).values({ name: role });
        }
    }
    console.log('Migration complete');
    exit(0);
})();