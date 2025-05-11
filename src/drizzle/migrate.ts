
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

    await db?.insert(schema.users).values({ name: 'Alexandre Pansan', email: "alexpjunior@terra.com.br", password: '123456' }).onConflictDoNothing();
    const groups = await db?.insert(schema.transactionGroups).values([
        { name: 'Cartão de crédito' }, { name: 'Cartão de débito' }, { name: 'Carro' }, { name: 'Casa' }
    ]).returning({ id: schema.transactionGroups.id, name: schema.transactionGroups.name }).onConflictDoNothing();

    for (let group of groups) {
        switch (group.name) {
            case 'Cartão de crédito':
                await db?.insert(schema.transactionCategories).values([
                    { name: 'Gympass', groupId: group.id },
                    { name: 'Compras Genéricas', groupId: group.id },
                    { name: 'Mercado', groupId: group.id },
                    { name: 'Combustivel', groupId: group.id },
                ]);
                break;
            case 'Cartão de débito':
                await db?.insert(schema.transactionCategories).values([
                    { name: 'Compras Genéricas', groupId: group.id },
                    { name: 'Mercado', groupId: group.id },
                    { name: 'Combustivel', groupId: group.id },
                ]);
                break;
            case 'Carro':
                await db?.insert(schema.transactionCategories).values([
                    { name: 'IPVA', groupId: group.id },
                    { name: 'Seguro', groupId: group.id },
                    { name: 'Financiamento', groupId: group.id },
                ]);

                break;
            case 'Casa':
                await db?.insert(schema.transactionCategories).values([
                    { name: 'Aluguel', groupId: group.id },
                    { name: 'Condominio', groupId: group.id },
                    { name: 'IPTU', groupId: group.id },
                    { name: 'Vivo', groupId: group.id },
                    { name: 'Energia', groupId: group.id },

                ]);
        }
    }

    console.log('Default user inserted');



    console.log('Migration complete');
    exit(0);
})();